import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import copyToClipboard from 'clipboard-copy'
import { FieldProps } from '@keystone-6/core/types'
import { FieldContainer, FieldLabel, TextInput } from '@keystone-ui/fields'
import { Button } from '@keystone-ui/button'
import { Tooltip } from '@keystone-ui/tooltip'
import { ClipboardIcon, SearchIcon } from '@keystone-ui/icons'
import { controller } from '@keystone-6/core/fields/types/virtual/views'
import { Post } from './twreporter-related-posts'

const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`

const KeywordPostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
`

const KeywordPost = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`

const IconButton = styled(Button)`
  background-color: transparent;
  margin: 0 0 0 0.5rem;
`

const selectedTagsNum = 3
const selectedPostsNum = 6

export const Field = ({ field, value }: FieldProps<typeof controller>) => {
  const customSearchURL = `https://www.googleapis.com/customsearch/v1?key=${value.searchAPIKey}&cx=${value.twreporterID}`
  const tagsStr = value.tags
    .filter((tag, index) => index < selectedTagsNum)
    .map((tag) => tag.label)
    .join(' ')

  const [searchInput, setSearchInput] = useState<string>(tagsStr)
  const [posts, setPosts] = useState<Post[]>([])
  const [isResponding, setIsResponding] = useState<boolean>(false)

  // Initially fetch top 'selectedPostsNum' posts by searching top 'selectedTagsNum' tags
  useEffect(() => {
    const searchPostsByTags = async () => {
      const response = await axios.get(`${customSearchURL}&q=${searchInput}`)
      const posts = response?.data?.items
        ?.filter(
          (item, index) =>
            index <
            selectedPostsNum /*&& item?.pagemap?.metatags?.[0]['og:type'] === 'article'*/
        )
        ?.map((item) => {
          const metaTag = item?.pagemap?.metatags?.[0]
          return {
            src: item.link,
            ogImgSrc: metaTag['og:image'],
            ogTitle: metaTag['og:title'],
            ogDescription: metaTag['og:description'],
          }
        })
      setPosts(posts ?? [])
    }
    searchPostsByTags()
  }, [])

  const handleInputChange = (e) => {
    setSearchInput(e.target.value)
  }

  const handlenKeyDown = async (e) => {
    if (e.key === 'Enter') {
      await handleSearch()
    }
  }

  const handleSearch = async () => {
    setIsResponding(true)
    const response = await axios.get(`${customSearchURL}&q=${searchInput}`)
    const posts = response?.data?.items?.map((item) => {
      const metaTag = item?.pagemap?.metatags?.[0]
      return {
        src: item.link,
        ogImgSrc: metaTag['og:image'],
        ogTitle: metaTag['og:title'],
        ogDescription: metaTag['og:description'],
      }
    })
    setPosts(posts ?? [])
    setIsResponding(false)
  }

  const handleCopyPost = (index: number) => {
    copyToClipboard(JSON.stringify(posts[index]))
  }

  const relatedPostsComponent = (
    <>
      {`搜尋到 ${posts?.length} 個結果：`}
      {posts?.map((post, index) => {
        return (
          <KeywordPost key={`keyword-post-${index}`}>
            {index + 1}
            <a
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '10px',
                flex: '2',
              }}
              href={post.src}
              target="_blank"
            >
              <img width="100px" src={post.ogImgSrc} />
              {post.ogTitle}
            </a>
            <Tooltip content="複製">
              {(props) => (
                <IconButton
                  {...props}
                  size="small"
                  onClick={() => handleCopyPost(index)}
                >
                  <ClipboardIcon size="small" />
                </IconButton>
              )}
            </Tooltip>
          </KeywordPost>
        )
      })}
    </>
  )

  return (
    <FieldContainer>
      <FieldLabel>{field.label}</FieldLabel>
      <SearchContainer>
        <TextInput
          value={searchInput}
          placeholder="輸入關鍵字搜尋報導者文章..."
          onChange={handleInputChange}
          onKeyDown={handlenKeyDown}
        />
        <Tooltip content="搜尋">
          {(props) => (
            <Button {...props} onClick={handleSearch}>
              <SearchIcon size="small" />
            </Button>
          )}
        </Tooltip>
      </SearchContainer>
      <KeywordPostsContainer>
        {isResponding && (
          <>
            {'搜尋中...'}
            <img
              style={{ width: '60px', height: '40px' }}
              src="/typing-texting.gif"
            />
          </>
        )}
        {!isResponding && relatedPostsComponent}
      </KeywordPostsContainer>
    </FieldContainer>
  )
}
