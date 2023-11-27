import React, { useState } from 'react'
import styled from 'styled-components'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { FieldProps } from '@keystone-6/core/types'
import { Button } from '@keystone-ui/button'
import { FieldContainer, FieldLabel, TextInput } from '@keystone-ui/fields'
import { PlusCircleIcon, TrashIcon } from '@keystone-ui/icons'
import { Divider } from '@keystone-ui/core'
import { controller } from '@keystone-6/core/fields/types/virtual/views'

type Author = {
  id: string | undefined
  name: string
  role: string
  type: string
}

const AuthorContainer = styled.div`
  flex: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  gap: 15px;
`

const ID = styled.span`
  width: 40px;
`

const Name = styled.div`
  width: 25%;
`

const Role = styled.div`
  width: 25%;
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

const GapDivider = styled(Divider)`
  margin-top: 10px;
  margin-bottom: 15px;
`

const authorTemplate = {
  id: undefined,
  name: '',
  role: '文字',
  type: 'string',
}

const AuthorComponent = (props: {
  author: Author
  isNameEditable?: boolean
  onNameChange: React.ChangeEventHandler<HTMLInputElement>
  onRoleChange: React.ChangeEventHandler<HTMLInputElement>
  actionElement: React.ReactNode
}) => {
  const author = props?.author
  return (
    author && (
      <AuthorContainer>
        <ID>{author.id ?? 'N/A'}</ID>
        <Name>
          {props.isNameEditable ? (
            <TextInput
              placeholder="姓名"
              onChange={props.onNameChange}
              value={author.name}
            />
          ) : (
            author.name
          )}
        </Name>
        <Role>
          <TextInput
            placeholder="角色"
            onChange={props.onRoleChange}
            value={author.role}
          />
        </Role>
        <span>{author.type}</span>
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
  const [authors, setAuthors] = useState<Author[]>(
    value ? JSON.parse(value) : []
  )
  const [newAuthor, setNewAuthor] = useState<Author>({ ...authorTemplate })

  const onAddNewAuthor = () => {
    if (onChange) {
      const newAuthors = [...authors, newAuthor]
      setAuthors(newAuthors)
      onChange(JSON.stringify(newAuthors))
      setNewAuthor({ ...authorTemplate })
    }
  }

  const onDeleteAuthor = (index: number) => {
    if (onChange && index >= 0 && index < authors.length) {
      const newAuthors = [...authors]
      newAuthors.splice(index, 1)
      setAuthors(newAuthors)
      onChange(JSON.stringify(newAuthors))
    }
  }

  const onUpdateAuthorName = (index: number, name: string) => {
    if (onChange && index >= 0 && index < authors.length) {
      const before = authors.slice(0, index)
      const modifiedAuthor = {
        ...authors[index],
      }
      modifiedAuthor.name = name
      const after = authors.slice(index + 1)
      const newAuthors = [...before, modifiedAuthor, ...after]
      setAuthors(newAuthors)
      onChange(JSON.stringify(newAuthors))
    }
  }

  const onUpdateAuthorRole = (index: number, role: string) => {
    if (onChange && index >= 0 && index < authors.length) {
      const before = authors.slice(0, index)
      const modifiedAuthor = {
        ...authors[index],
      }
      modifiedAuthor.role = role
      const after = authors.slice(index + 1)
      const newAuthors = [...before, modifiedAuthor, ...after]
      setAuthors(newAuthors)
      onChange(JSON.stringify(newAuthors))
    }
  }

  const onUpdateNewAuthorName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAuthor({
      id: newAuthor.id,
      name: e.target.value,
      role: newAuthor.role,
      type: newAuthor.type,
    })
  }

  const onUpdateNewAuthorRole = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAuthor({
      id: newAuthor.id,
      name: newAuthor.name,
      role: e.target.value,
      type: newAuthor.type,
    })
  }

  const reorderAuthor = (
    authors: Author[],
    startIndex: number,
    endIndex: number
  ) => {
    const result = Array.from(authors)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return
    }

    if (onChange) {
      const newAuthors = reorderAuthor(
        authors,
        result.source.index,
        result.destination.index
      )
      setAuthors(newAuthors)
      onChange(JSON.stringify(newAuthors))
    }
  }

  // Apply react-beautiful-dnd to re-order(drag & drop) existing authors
  const authorsDndComponent = (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {authors.map((author: any, index: number) => {
              const id = `author-component-${index}`
              const isAuthorEntity = author.id !== undefined
              return (
                <Draggable key={id} draggableId={id} index={index}>
                  {(provided) => (
                    <DndItem
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <AuthorComponent
                        author={author}
                        isNameEditable={!author?.id}
                        onNameChange={(e) =>
                          onUpdateAuthorName(index, e.target.value)
                        }
                        onRoleChange={(e) =>
                          onUpdateAuthorRole(index, e.target.value)
                        }
                        actionElement={
                          <IconButton
                            size="small"
                            onClick={() =>
                              !isAuthorEntity && onDeleteAuthor(index)
                            }
                            isDisabled={isAuthorEntity}
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

  return (
    <FieldContainer>
      <FieldLabel>{field.label}</FieldLabel>
      {authorsDndComponent}
      <GapDivider />
      {onChange && (
        <AuthorComponent
          author={newAuthor}
          isNameEditable={true}
          onNameChange={onUpdateNewAuthorName}
          onRoleChange={onUpdateNewAuthorRole}
          actionElement={
            <IconButton size="small" onClick={onAddNewAuthor}>
              <PlusCircleIcon size="small" color="green" />
            </IconButton>
          }
        />
      )}
    </FieldContainer>
  )
}
