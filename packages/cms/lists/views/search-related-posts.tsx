import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { FieldProps } from '@keystone-6/core/types'
import { FieldContainer, TextInput } from '@keystone-ui/fields'
import { Button } from '@keystone-ui/button'
import { ArrowRightIcon, PlusCircleIcon } from '@keystone-ui/icons'
import { controller } from '@keystone-6/core/fields/types/virtual/views'

type Post = {
  src: string
  ogImgSrc: string
  ogTitle: string
  ogDescription: string
}

const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
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

export const Field = ({ value }: FieldProps<typeof controller>) => {
  const customSearchURL = `https://www.googleapis.com/customsearch/v1?key=${value.searchAPIKey}&cx=${value.twreporterID}`
  const tagsStr = value.tags.map((tag) => tag.label).join(',')

  const [searchInput, setSearchInput] = useState<string>(tagsStr)
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    const searchPostsByTags = async () => {
      const response = await axios.get(`${customSearchURL}&q=${searchInput}`)
      const posts = response.data.items.map((item) => {
        const metaTag = item?.pagemap?.metatags?.[0]
        return {
          src: item.link,
          ogImgSrc: metaTag['og:image'],
          ogTitle: metaTag['og:title'],
          ogDescription: metaTag['og:description'],
        }
      })
      setPosts(posts)
    }
    searchPostsByTags()
  }, [])

  const handleInputChange = (e) => {
    setSearchInput(e.target.value)
  }

  const handleSearch = async () => {
    const response = await axios.get(`${customSearchURL}&q=${searchInput}`)
    const posts = response.data.items.map((item) => {
      const metaTag = item?.pagemap?.metatags?.[0]
      return {
        src: item.link,
        ogImgSrc: metaTag['og:image'],
        ogTitle: metaTag['og:title'],
        ogDescription: metaTag['og:description'],
      }
    })
    setPosts(posts)
  }

  const handleAddPost = () => {
    console.log('add')
  }

  return (
    <FieldContainer>
      <SearchContainer>
        <TextInput
          value={searchInput}
          placeholder="搜尋主網站文章..."
          onChange={handleInputChange}
        />
        <Button onClick={handleSearch}>
          <ArrowRightIcon size="small" />
        </Button>
      </SearchContainer>
      {posts.map((post, index) => {
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
            <IconButton size="small" onClick={handleAddPost}>
              <PlusCircleIcon size="small" />
            </IconButton>
          </KeywordPost>
        )
      })}
    </FieldContainer>
  )
}
