import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { FieldProps } from '@keystone-6/core/types'
import { FieldContainer, Select } from '@keystone-ui/fields'
import { Button } from '@keystone-ui/button'
import { TrashIcon } from '@keystone-ui/icons'
import { controller } from '@keystone-6/core/fields/types/virtual/views'

const apiEndpoint = '/api/graphql'

type Relationship = {
  id: string
  label: string
}

const IconButton = styled(Button)`
  background-color: transparent;
  margin: 0 0 0 0.5rem;
`

const DndItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  userselect: 'none';
  padding: 5px;
  margin: 5px 0 5px 0;
  border: 1px solid lightgrey;
  border-radius: 5px;
`

export const Field = ({
  field,
  value,
  onChange,
}: FieldProps<typeof controller>) => {
  const listName = field.listKey
  const listNameLowercase = listName.charAt(0).toLowerCase() + listName.slice(1)
  const targetListName = field.refListKey
  const targetListNameLowercase =
    targetListName.charAt(0).toLowerCase() + targetListName.slice(1)
  const listID = value?.id
  const relationshipFieldName = field?.path
  const orderFieldName = `${relationshipFieldName}_order`
  const orderGQL = `
    query($where: ${listName}WhereUniqueInput!) {
      ${listNameLowercase}(where: $where) {
        ${orderFieldName}
      }
    }
  `
  const [relationships, setRelationships] = useState<Relationship[]>(
    value?.value?.map((relationship) => {
      return {
        id: relationship?.id,
        value: relationship.id,
        label: relationship.label,
      }
    })
  )
  const [options, setOptions] = useState([])

  // console.log(field, value, listName)
  // console.log('fieldNames', relationshipFieldName, orderFieldName)
  console.log(relationships)

  const handleQueryOrder = async () => {
    try {
      const orderRes = await axios.post(apiEndpoint, {
        query: orderGQL,
        variables: {
          where: {
            id: listID,
          },
        },
      })
      const orderResult =
        orderRes?.data?.data?.[listNameLowercase]?.[`${orderFieldName}`]
      if (orderResult) {
        const orderedIDs = orderResult.split(',')
        const orderedRelationships = orderedIDs.map((id: string) => {
          return relationships.find((relationship) => relationship.id === id)
        })
        setRelationships(orderedRelationships)
      }

      const listGQL = `query {
        ${targetListNameLowercase}s {
          id
          title
        }
      }`
      const optionsRes = await axios.post(apiEndpoint, {
        query: listGQL,
      })
      const optionsData = optionsRes?.data?.data?.[
        `${targetListNameLowercase}s`
      ]?.map((list) => {
        return {
          label: list.title, // TODO: handle label, make it general
          value: list.id,
          id: list.id,
        }
      })
      setOptions(optionsData)
    } catch (err) {
      console.log(err)
    }
  }

  const onSelectChange = (value) => {
    setRelationships([...relationships, { id: value, ...value }])
    console.log(value)
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
      <Select options={options} onChange={onSelectChange} />
      {relationshipsDndComponent}
      {relationships.map((relationship) => relationship.id).join(',')}
    </FieldContainer>
  )
}
