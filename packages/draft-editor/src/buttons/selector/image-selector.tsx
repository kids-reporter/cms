import React, { useState, useEffect, useRef } from 'react'
import debounce from 'lodash/debounce'
import styled from 'styled-components'
import { TextInput } from '@keystone-ui/fields'
import { Drawer, DrawerController } from '@keystone-ui/modals'
import { gql, useLazyQuery } from '@keystone-6/core/admin-ui/apollo'
import { AlignSelector } from './align-selector'
import { SearchBox, SearchBoxOnChangeFn } from './search-box'
import { Pagination } from './pagination'

const _ = {
  debounce,
}

const ImageSearchBox = styled(SearchBox)`
  margin-top: 10px;
`

const ImageSelectionWrapper = styled.div`
  overflow: auto;
  margin-top: 10px;
`
const ImageBlockMetaWrapper = styled.div``

const ImageGridsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
  margin-top: 5px;
`

const ImageGridWrapper = styled.div`
  flex: 0 0 33.3333%;
  cursor: pointer;
  padding: 0 10px 10px;
`

const ImageMetaGridsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
`

const ImageMetaGridWrapper = styled.div`
  flex: 0 0 33.3333%;
  cursor: pointer;
  padding: 0 10px 10px;
`

const Image = styled.img`
  display: block;
  width: 100%;
  aspect-ratio: 2;
  object-fit: cover;
`

const Label = styled.label`
  display: block;
  margin: 10px 0;
  font-weight: 600;
`

const SeparationLine = styled.div`
  border: #e1e5e9 1px solid;
  margin-top: 10px;
  margin-bottom: 10px;
`

const ErrorWrapper = styled.div`
  & * {
    margin: 0;
  }
`

type ID = string

export type ImageEntity = {
  id: ID
  // `idForImageSelectorOnly` is designed for selecting one image multiple times
  idForImageSelectorOnly?: ID
  name?: string
  imageFile: {
    url: string
    width: number
    height: number
  }
  resized: {
    original: string
    tiny: string
    small: string
    medium: string
    large: string
  }
}

export type ImageEntityWithMeta = ImageEntity & {
  desc?: string
  url?: string
}

type ImageEntityOnSelectFn = (param: ImageEntity) => void

function ImageGrids(props: {
  images: ImageEntity[]
  onSelect: ImageEntityOnSelectFn
}): React.ReactElement {
  const { images, onSelect } = props

  return (
    <ImageGridsWrapper>
      {images.map((image) => {
        return (
          <ImageGridWrapper key={image.id} onClick={() => onSelect(image)}>
            <Image src={image?.imageFile?.url} />
          </ImageGridWrapper>
        )
      })}
    </ImageGridsWrapper>
  )
}

type ImageMetaOnChangeFn = (
  params: ImageEntityWithMeta,
  actionType: 'delete' | 'modify'
) => void

function ImageMetaGrids(props: {
  imageMetas: ImageEntityWithMeta[]
  onChange: ImageMetaOnChangeFn
  enableCaption: boolean
  enableUrl: boolean
  enableDelete: boolean
}) {
  const { imageMetas, onChange, enableCaption, enableUrl, enableDelete } = props
  return (
    <ImageMetaGridsWrapper>
      {imageMetas.map((imageMeta, idx) => (
        <ImageMetaGrid
          key={`${imageMeta.id}_${idx}`}
          imageMeta={imageMeta}
          enableCaption={enableCaption}
          enableUrl={enableUrl}
          enableDelete={enableDelete}
          onChange={onChange}
        />
      ))}
    </ImageMetaGridsWrapper>
  )
}

function ImageMetaGrid(props: {
  imageMeta: ImageEntityWithMeta
  onChange: ImageMetaOnChangeFn
  enableCaption: boolean
  enableUrl: boolean
  enableDelete: boolean
}): React.ReactElement {
  const { imageMeta, enableCaption, enableUrl, enableDelete, onChange } = props
  const { desc, url } = imageMeta

  return (
    <ImageMetaGridWrapper>
      {enableDelete && (
        <i
          onClick={() => {
            onChange(imageMeta, 'delete')
          }}
          className="fas fa-check-circle"
        ></i>
      )}
      <Image src={imageMeta?.imageFile?.url} />
      {enableCaption && (
        <React.Fragment>
          <Label htmlFor="caption">Image Caption:</Label>
          <TextInput
            id="caption"
            type="text"
            placeholder={imageMeta?.name}
            defaultValue={desc}
            onChange={_.debounce((e) => {
              onChange(
                Object.assign({}, imageMeta, {
                  desc: e.target.value,
                  url,
                }),
                'modify'
              )
            })}
          />
        </React.Fragment>
      )}
      {enableUrl && (
        <React.Fragment>
          <Label htmlFor="url">Url:</Label>
          <TextInput
            id="url"
            type="text"
            placeholder="(Optional)"
            defaultValue={url}
            onChange={_.debounce((e) => {
              onChange(
                Object.assign({}, imageMeta, {
                  desc,
                  url: e.target.value,
                }),
                'modify'
              )
            })}
          />
        </React.Fragment>
      )}
    </ImageMetaGridWrapper>
  )
}

type DelayInputOnChangeFn = (param: string) => void

function DelayInput(props: {
  delay: string
  onChange: DelayInputOnChangeFn
}): React.ReactElement {
  const { delay, onChange } = props

  return (
    <React.Fragment>
      <Label>Slideshow delay:</Label>
      <TextInput
        type="number"
        placeholder="請輸入自動切換秒數"
        step="0.5"
        min="1"
        value={delay}
        onChange={(e) => {
          onChange(e.target.value)
        }}
      />
    </React.Fragment>
  )
}

const imagesQuery = gql`
  query Photos($searchText: String!, $take: Int, $skip: Int) {
    photosCount(where: { name: { contains: $searchText } })
    photos(
      where: { name: { contains: $searchText } }
      take: $take
      skip: $skip
    ) {
      id
      name
      imageFile {
        url
        width
        height
      }
      resized {
        original
        tiny
        small
        medium
        large
      }
    }
  }
`

export type ImageSelectorOnChangeFn = (
  params: ImageEntityWithMeta[],
  alignment?: string,
  delay?: number
) => void

export function ImageSelector(props: {
  enableMultiSelect?: boolean
  enableCaption?: boolean
  enableUrl?: boolean
  enableAlignment?: boolean
  enableDelay?: boolean
  onChange: ImageSelectorOnChangeFn
  selected?: ImageEntityWithMeta[]
  alignment?: string
}) {
  const alignment = props.alignment || 'default'
  const [
    queryImages,
    {
      loading,
      error,
      data: { photos: images = [], photosCount: imagesCount = 0 } = {},
    },
  ] = useLazyQuery(imagesQuery, { fetchPolicy: 'no-cache' })
  const [currentPage, setCurrentPage] = useState(0) // page starts with 1, 0 is used to detect initialization
  const [searchText, setSearchText] = useState('')
  const [selected, setSelected] = useState<ImageEntityWithMeta[]>(
    props.selected || []
  )
  const [delay, setDelay] = useState('5')
  const [align, setAlign] = useState(alignment)
  const contentWrapperRef = useRef<HTMLDivElement>(null)

  const pageSize = 6

  const options = [
    { value: 'default', label: 'default', isDisabled: false },
    { value: 'paragraph-width', label: '與文章段落等寬', isDisabled: false },
    { value: 'left', label: 'left', isDisabled: false },
    { value: 'right', label: 'right', isDisabled: false },
  ]

  const {
    enableMultiSelect = false,
    enableCaption = false,
    enableUrl = false,
    enableAlignment = false,
    enableDelay = false,
    onChange,
  } = props

  const onSave = () => {
    let adjustedDelay = +delay
    adjustedDelay = adjustedDelay < 1 ? 1 : adjustedDelay
    onChange(selected, align, adjustedDelay)
  }

  const onCancel = () => {
    onChange([])
  }

  const onSearchBoxChange: SearchBoxOnChangeFn = async (searchInput) => {
    setSearchText(searchInput)
    setCurrentPage(1)
  }

  const onDealyChange = (delay: string) => {
    setDelay(delay)
  }

  const onAlignSelectChange = (align: string) => {
    setAlign(align)
  }

  const onAlignSelectOpen = () => {
    const scrollWrapper = contentWrapperRef.current?.parentElement
    if (scrollWrapper) {
      scrollWrapper.scrollTop = scrollWrapper?.scrollHeight
    }
  }

  const onImageMetaChange: ImageMetaOnChangeFn = (
    imageEntityWithMeta,
    actionType
  ) => {
    switch (actionType) {
      case 'delete': {
        setSelected(
          selected.filter(
            (s) =>
              s.idForImageSelectorOnly !==
              imageEntityWithMeta.idForImageSelectorOnly
          )
        )
        break
      }
      case 'modify': {
        const foundIndex = selected.findIndex(
          (ele) =>
            ele.idForImageSelectorOnly ===
            imageEntityWithMeta.idForImageSelectorOnly
        )
        if (foundIndex !== -1) {
          const newSelected = [...selected]
          newSelected[foundIndex] = imageEntityWithMeta
          setSelected(newSelected)
        }
        break
      }
    }
  }

  const onImagesGridSelect: ImageEntityOnSelectFn = (imageEntity) => {
    const newImageEntity = Object.assign(
      {
        // `idForImageSelectorOnly` is designed for selecting one image multiple times
        idForImageSelectorOnly: `${imageEntity.id}_${selected.length + 1}`,
        desc: '',
      },
      imageEntity
    )

    if (enableMultiSelect) {
      setSelected(selected.concat(newImageEntity))
      return
    }

    setSelected([newImageEntity])
  }

  useEffect(() => {
    if (currentPage !== 0) {
      queryImages({
        variables: {
          searchText: searchText,
          skip: (currentPage - 1) * pageSize,
          take: pageSize,
        },
      })
    }
  }, [currentPage, searchText])

  let searchResult = (
    <React.Fragment>
      <ImageGrids images={images} onSelect={onImagesGridSelect} />
      <Pagination
        currentPage={currentPage}
        total={imagesCount}
        pageSize={pageSize}
        onChange={(pageIndex: number) => {
          setCurrentPage(pageIndex)
        }}
      />
    </React.Fragment>
  )
  if (loading) {
    searchResult = <p>searching...</p>
  }
  if (error) {
    searchResult = (
      <ErrorWrapper>
        <h3>Errors occurs in the `images` query</h3>
        <div>
          <br />
          <b>Message:</b>
          <div>{error.message}</div>
          <br />
          <b>Stack:</b>
          <div>{error.stack}</div>
          <br />
          <b>Query:</b>
          <pre>{imagesQuery.loc?.source.body}</pre>
        </div>
      </ErrorWrapper>
    )
  }

  return (
    <DrawerController isOpen={true}>
      <Drawer
        title="Select image"
        actions={{
          cancel: {
            label: 'Cancel',
            action: onCancel,
          },
          confirm: {
            label: 'Confirm',
            action: onSave,
          },
        }}
      >
        <div ref={contentWrapperRef}>
          <ImageSearchBox onChange={onSearchBoxChange} />
          <ImageSelectionWrapper>
            <div>{searchResult}</div>
            {!!selected.length && <SeparationLine />}
            <ImageMetaGrids
              imageMetas={selected}
              onChange={onImageMetaChange}
              enableCaption={enableCaption}
              enableUrl={enableUrl}
              enableDelete={enableMultiSelect}
            />
          </ImageSelectionWrapper>
          <ImageBlockMetaWrapper>
            {(enableDelay || enableAlignment) && <SeparationLine />}
            {enableDelay && (
              <DelayInput delay={delay} onChange={onDealyChange} />
            )}
            {enableAlignment && (
              <AlignSelector
                align={align}
                options={options}
                onChange={onAlignSelectChange}
                onOpen={onAlignSelectOpen}
              />
            )}
          </ImageBlockMetaWrapper>
        </div>
      </Drawer>
    </DrawerController>
  )
}
