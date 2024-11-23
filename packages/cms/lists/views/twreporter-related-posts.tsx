import React, { useState } from 'react'
import styled from 'styled-components'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { FieldProps } from '@keystone-6/core/types'
import { Button } from '@keystone-ui/button'
import { FieldContainer, FieldLabel, TextArea } from '@keystone-ui/fields'
import { Tooltip } from '@keystone-ui/tooltip'
import {
  TrashIcon,
  CornerUpRightIcon,
  PlusCircleIcon,
} from '@keystone-ui/icons'
import { controller } from '@keystone-6/core/fields/types/virtual/views'

type Post = {
  src: string
  ogImgSrc: string
  ogTitle: string
  ogDescription: string
}

const AuthorContainer = styled.div`
  flex: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  gap: 15px;
`

const IconButton = styled(Button)`
  background-color: transparent;
  margin: 0 0 0 0.5rem;
`

const DndItem = styled.div`
  userselect: 'none';
  padding: 5px;
  margin: 0 0 5px 0;
  border: 1px solid lightgrey;
  border-radius: 5px;
`

const PostComponent = (props: {
  index: number
  post: Post
  actionElement: React.ReactNode
}) => {
  const post = props.post
  return (
    post && (
      <AuthorContainer>
        {`${props.index}.`}
        <img width="100px" src={post.ogImgSrc} />
        <div style={{ flex: '2' }}>{post.ogTitle}</div>
        <a href={post.src} target="_blank">
          <CornerUpRightIcon size="small" />
        </a>
        {props.actionElement}
      </AuthorContainer>
    )
  )
}

export const Field = ({
  field,
  value,
  onChange,
}: FieldProps<typeof controller>) => {
  const [newPost, setNewPost] = useState('')
  const [relatedPosts, setRelatedPosts] = useState<Post[]>(
    value ? JSON.parse(value) : []
  )
  const [prevValue, setPrevValue] = useState(value)

  if (value !== prevValue) {
    setPrevValue(value)
    setRelatedPosts(value ? JSON.parse(value) : [])
  }

  const onAddPost = () => {
    // TODO: json validation
    if (onChange) {
      const postJSON = JSON.parse(newPost)
      const newRelatedPosts = [...relatedPosts, postJSON]
      setRelatedPosts(newRelatedPosts)
      onChange(JSON.stringify(newRelatedPosts))
      setNewPost('')
    }
  }

  const onDeletePost = (index: number) => {
    if (onChange && index >= 0 && index < relatedPosts.length) {
      const newRelatedPosts = [...relatedPosts]
      newRelatedPosts.splice(index, 1)
      setRelatedPosts(newRelatedPosts)
      onChange(JSON.stringify(newRelatedPosts))
    }
  }

  const reorderPost = (posts: Post[], startIndex: number, endIndex: number) => {
    const result = Array.from(posts)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return
    }

    if (onChange) {
      const newRelatedPosts = reorderPost(
        relatedPosts,
        result.source.index,
        result.destination.index
      )
      setRelatedPosts(newRelatedPosts)
      onChange(JSON.stringify(newRelatedPosts))
    }
  }

  // Apply react-beautiful-dnd to re-order(drag & drop) existing posts
  const postsDndComponent = (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {relatedPosts.map((post: any, index: number) => {
              const id = `post-component-${index}`
              return (
                <Draggable key={id} draggableId={id} index={index}>
                  {(provided) => (
                    <DndItem
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <PostComponent
                        index={index + 1}
                        post={post}
                        actionElement={
                          <IconButton
                            size="small"
                            onClick={() => onDeletePost(index)}
                          >
                            <TrashIcon size="small" />
                          </IconButton>
                        }
                      />
                    </DndItem>
                  )}
                </Draggable>
              )
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )

  const handleNewPostChange = (e) => {
    setNewPost(e.target.value)
  }

  const addPostComponent = (
    <div
      style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
    >
      <TextArea
        value={newPost}
        onChange={handleNewPostChange}
        placeholder="新增 - 貼上上方複製之內容"
      ></TextArea>
      <Tooltip content="新增">
        {(props) => (
          <IconButton {...props} size="small" onClick={onAddPost}>
            <PlusCircleIcon size="small" />
          </IconButton>
        )}
      </Tooltip>
    </div>
  )

  return (
    <FieldContainer>
      <FieldLabel>{field.label}</FieldLabel>
      {postsDndComponent}
      {addPostComponent}
    </FieldContainer>
  )
}
