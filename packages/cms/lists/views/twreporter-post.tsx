import React, { useState } from 'react'
import styled from 'styled-components'
import AsyncSelect from 'react-select/async'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { FieldProps } from '@keystone-6/core/types'
import { Button } from '@keystone-ui/button'
import { FieldContainer, FieldLabel } from '@keystone-ui/fields'
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

const SearchPostContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`

const authorTemplate = {
  id: undefined,
  name: '',
  role: '文字',
  type: 'string',
}

type Post = {
  src: string
  ogImgSrc: string
  ogTitle: string
}

const AuthorComponent = (props: {
  post: Post
  actionElement: React.ReactNode
}) => {
  const post = props.post
  return (
    post && (
      <AuthorContainer>
        <img width="100px" src={post.ogImgSrc} />
        <div>{post.ogTitle}</div>
        {props.actionElement}
      </AuthorContainer>
    )
  )
}

const posts = [
  {
    src: 'https://www.twreporter.org/a/uncertain-future-of-chifeng-and-nanxi-shopping-district',
    ogImgSrc:
      'https://www.twreporter.org/images/20241112130105-624a07f6e5e3ba6384a7dba5790487cd-tablet.jpg',
    ogTitle:
      '赤峰、南西商圈求生記──北市府放寬納管，街區能保留風貌、與居民共贏？ - 報導者 The Reporter',
    ogDescription:
      '台北市赤峰、南西商圈自4月起有超過70間店遭檢舉不符住宅區用地規定，規模之大史無前例。面臨歇業危機的商家在11月等到市府公文，放寬商家可依新規定申請「納管評點」。赤峰、南西有望成為以社區共識促成都市計畫調整的新案例嗎？',
  },
  {
    src: 'https://www.twreporter.org/a/nantou-elemetory-baseball-coach-sexual-assault-first-instance-judgment',
    ogImgSrc:
      'https://www.twreporter.org/images/20241113185153-d2659be3c243d2cec2fe83b3f712ae12-tablet.jpg',
    ogTitle:
      '「本來沒預期這麼多被害人出現」：南投新豐國小前棒球隊教練黃偉傑性侵球員近20年，一審判決13年 - 報導者 The Reporter',
    ogDescription:
      '農曆年前的一則情資，意外揭開在偏鄉長期投注教育與照顧弱勢學童的國小棒球隊教練黃偉傑的真面目，案情如滾雪球不斷湧現，22位被害人多數已成年，反映出棒球校隊的封閉環境、地方人脈緊密難以穿透、男性受害者難以啟齒等多重困境，使獵童者能長期遂行兒少性犯罪的問題⋯⋯',
  },
]

export const Field = ({
  field,
  value,
  onChange,
}: FieldProps<typeof controller>) => {
  const [authors, setAuthors] = useState<Author[]>(
    value ? JSON.parse(value) : []
  )
  const [newAuthor, setNewAuthor] = useState<Author>({ ...authorTemplate })

  const [prevValue, setPrevValue] = useState(value)

  // TODO: get tags via gql query
  // TODO: query posts with tags, useEffect
  // TODO: query posts with query string

  if (value !== prevValue) {
    setPrevValue(value)
    setAuthors(value ? JSON.parse(value) : [])
  }

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
            {posts.map((post: any, index: number) => {
              const id = `author-component-${index}`
              return (
                <Draggable key={id} draggableId={id} index={index}>
                  {(provided) => (
                    <DndItem
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <AuthorComponent
                        post={post}
                        onNameChange={(e) =>
                          onUpdateAuthorName(index, e.target.value)
                        }
                        onRoleChange={(e) =>
                          onUpdateAuthorRole(index, e.target.value)
                        }
                        actionElement={
                          <IconButton
                            size="small"
                            onClick={() => onDeleteAuthor(index)}
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
      <SearchPostContainer>
        <AsyncSelect
          placeholder="搜尋文章..."
          cacheOptions
          defaultOptions
          loadOptions={() => {
            console.log('load')
          }}
        />
        <IconButton size="small" onClick={onAddNewAuthor}>
          <PlusCircleIcon size="small" color="green" />
        </IconButton>
      </SearchPostContainer>
    </FieldContainer>
  )
}
