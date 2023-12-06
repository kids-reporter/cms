import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { FieldProps } from '@keystone-6/core/types'
import { FieldContainer, FieldLabel, Select } from '@keystone-ui/fields'
import { Button } from '@keystone-ui/button'
import { TrashIcon } from '@keystone-ui/icons'
import { controller } from '@keystone-6/core/fields/types/virtual/views'

type Relationship = {
  id: string
  label: string
}

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

export const Field = ({
  field,
  value,
  onChange,
}: FieldProps<typeof controller>) => {
  const postID = value?.id
  const relationshipFieldName = field?.path
  const orderFieldName = relationshipFieldName?.replace(
    /relationship$/,
    'order'
  )
  const orderGql = `
    query($where: PostWhereUniqueInput!) {
      post(where: $where) {
        ${orderFieldName}
      }
    }
  `
  const [relationships, setRelationships] = useState<Relationship[]>(
    value?.value
  )
  const [order, setOrder] = useState('')
  const [options, setOptions] = useState([])

  // console.log(field, value)
  // console.log('fieldNames', relationshipFieldName, orderFieldName)
  // console.log(relationships)

  const handleQueryOrder = async () => {
    try {
      const orderRes = await axios.post('/api/graphql', {
        query: orderGql,
        variables: {
          where: {
            id: postID,
          },
        },
      })
      const orderResult = orderRes?.data?.data?.post?.[`${orderFieldName}`]
      if (orderResult) {
        const orderedIDs = orderResult.split(',')
        const orderedRelationships = orderedIDs.map((id: string) => {
          return relationships.find((relationship) => relationship.id === id)
        })
        setOrder(orderResult)
        setRelationships(orderedRelationships)
      }

      // TODO: make it general
      const optionsRes = await axios.post('/api/graphql', {
        query: `query{
          authors {
            name
            id
          }
        }`,
      })
      const optionsData = optionsRes?.data?.data?.authors?.map((author) => {
        return {
          label: author.name,
          id: author.id,
        }
      })
      setOptions(optionsData)
    } catch (err) {
      console.log(err)
    }
  }

  // TODO:
  // 2. render single select for adding item
  // 4. wire up handlers: save relationship/order

  const reorderRelationships = (
    relationships: Relationship[],
    startIndex: number,
    endIndex: number
  ) => {
    const result = Array.from(relationships)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }

  const onDeleteRelationship = (index: number) => {
    if (onChange && index >= 0 && index < relationships.length) {
      const newRelationships = [...relationships]
      newRelationships.splice(index, 1)
      setRelationships(newRelationships)
      // onChange(JSON.stringify(newAuthors))
    }
  }

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return
    }

    if (onChange) {
      const newRelationships = reorderRelationships(
        relationships,
        result.source.index,
        result.destination.index
      )
      const newOrder = newRelationships
        .map((relationship) => relationship.id)
        .join(',')
      setOrder(newOrder)
      setRelationships(newRelationships)
      //onChange(JSON.stringify(newAuthors))
    }
  }

  const relationshipsDndComponent = (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {relationships.map((relationship: any, index: number) => {
              const id = `relationship-component-${index}`
              return (
                <Draggable key={id} draggableId={id} index={index}>
                  {(provided) => (
                    <DndItem
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <span>{`${index + 1}: ${relationship.label}(id=${
                        relationship.id
                      })`}</span>
                      <IconButton
                        size="small"
                        onClick={() => onDeleteRelationship(index)}
                      >
                        <TrashIcon size="small" />
                      </IconButton>
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

  useEffect(() => {
    const getOrder = async () => {
      await handleQueryOrder()
    }
    getOrder()
  }, [])

  return (
    <FieldContainer>
      <FieldLabel>{field.label}</FieldLabel>
      <Select options={options} />
      {relationshipsDndComponent}
      {order}
    </FieldContainer>
  )
}
