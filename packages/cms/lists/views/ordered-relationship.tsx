import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { FieldProps } from '@keystone-6/core/types'
import {
  FieldContainer,
  FieldLabel,
  FieldDescription,
} from '@keystone-ui/fields'
import { useList } from '@keystone-6/core/admin-ui/context'
import { controller } from '@keystone-6/core/fields/types/relationship/views'
import { RelationshipSelect } from '@keystone-6/core/fields/types/relationship/views/RelationshipSelect'

const apiEndpoint = '/api/graphql'

type Relationship = {
  id: string
  value: string
  label: string
}

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
  autoFocus,
  onChange,
}: FieldProps<typeof controller>) => {
  const foreignList = useList(field.refListKey)
  const [relationships, setRelationships] = useState<any[]>(
    value?.value?.map((relationship) => {
      return {
        id: relationship?.id,
        value: relationship.id,
        label: relationship.label,
      }
    })
  )

  useEffect(() => {
    const handleQueryOrder = async () => {
      const listName = field.listKey
      const listNameLowercase =
        listName.charAt(0).toLowerCase() + listName.slice(1)
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
          console.log(orderedRelationships)
          // setRelationships(orderedRelationships)
        }
      } catch (err) {
        console.log(err)
      }
    }
    handleQueryOrder()
  }, [])

  const onDragEnd = (result: any) => {
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

  return value.kind === 'many' ? (
    <FieldContainer as="fieldset">
      <FieldLabel as="legend">{field.label}</FieldLabel>
      <FieldDescription id={`${field.path}-description`}>
        {field.description}
      </FieldDescription>
      <RelationshipSelect
        controlShouldRenderValue
        aria-describedby={
          field.description === null ? undefined : `${field.path}-description`
        }
        autoFocus={autoFocus}
        isDisabled={onChange === undefined}
        labelField={field.refLabelField}
        searchFields={field.refSearchFields}
        list={foreignList}
        portalMenu
        state={{
          kind: 'many',
          value: value.value,
          onChange(newItems) {
            setRelationships(
              newItems.map((item) => {
                return { id: item.id, label: item.label }
              })
            )
            onChange?.({
              ...value,
              value: newItems,
            })
          },
        }}
      />
      {relationshipsDndComponent}
      {relationships.map((relationship) => relationship.id).join(',')}
    </FieldContainer>
  ) : (
    <span>Unsupported kind -- support many-relationship only.</span>
  )
}
