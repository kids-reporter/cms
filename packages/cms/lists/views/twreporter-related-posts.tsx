import React, { useState } from 'react'
import styled from 'styled-components'
import AsyncSelect from 'react-select/async'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { FieldProps } from '@keystone-6/core/types'
import { Button } from '@keystone-ui/button'
import { FieldContainer, FieldLabel } from '@keystone-ui/fields'
import {
  PlusCircleIcon,
  TrashIcon,
  CornerUpRightIcon,
} from '@keystone-ui/icons'
import { Divider } from '@keystone-ui/core'
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

const KeywordPostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 10px;
`

const KeywordPost = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
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
        <div>{post.ogTitle}</div>
        <a href={post.src} target="_blank">
          <CornerUpRightIcon size="small" />
        </a>
        {props.actionElement}
      </AuthorContainer>
    )
  )
}

const posts_mock = [
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

const keywordPosts = posts_mock

export const Field = ({
  field,
  value,
  onChange,
}: FieldProps<typeof controller>) => {
  console.log(value)
  const [relatedPosts, setRelatedPosts] = useState<Post[]>(
    posts_mock
    //value ? JSON.parse(value) : []
  )
  const [prevValue, setPrevValue] = useState(value)

  if (value !== prevValue) {
    setPrevValue(value)
    setRelatedPosts(value ? JSON.parse(value) : [])
  }

  // TODO: get tags via gql query
  // TODO: query posts with tags, useEffect
  // https://www.twreporter.org/search?q=%E4%BD%8F%E5%AE%85%20%E6%96%B0%E5%8C%97
  // q=key1%skey2
  // TODO: query posts with query string

  const onAddNewPost = (post: Post) => {
    if (onChange) {
      const newRelatedPosts = [...relatedPosts, post]
      setRelatedPosts(newRelatedPosts)
      onChange(JSON.stringify(newRelatedPosts))
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

  const searchComponent = (
    <SearchPostContainer>
      {'依據關鍵字搜尋：'}
      <AsyncSelect
        placeholder="搜尋文章..."
        cacheOptions
        defaultOptions
        loadOptions={() => {
          console.log('load')
        }}
      />
    </SearchPostContainer>
  )

  const keywordPostsComponent = (
    <KeywordPostsContainer>
      {searchComponent}
      {keywordPosts.map((post, index) => {
        return (
          <KeywordPost key={`keyword-post-${index}`}>
            <a
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '10px',
              }}
              href={post.src}
              target="_blank"
            >
              <img width="100px" src={post.ogImgSrc} />
              {post.ogTitle}
            </a>
            <IconButton size="small" onClick={() => onAddNewPost(post)}>
              <PlusCircleIcon size="small" />
            </IconButton>
          </KeywordPost>
        )
      })}
    </KeywordPostsContainer>
  )

  return (
    <FieldContainer>
      <FieldLabel>{field.label}</FieldLabel>
      {postsDndComponent}
      <GapDivider />
      {keywordPostsComponent}
    </FieldContainer>
  )
}
