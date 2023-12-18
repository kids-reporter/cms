import React, { useState } from 'react'
import styled from 'styled-components'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { FieldProps } from '@keystone-6/core/types'
import { FieldContainer, FieldLabel } from '@keystone-ui/fields'
import { controller } from '@keystone-6/core/fields/types/json/views'

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
  const [relationships, setRelationships] = useState<any[]>(
    value ? JSON.parse(value) : []
  )

  const reorderRelationship = (
    relationships: any[],
    startIndex: number,
    endIndex: number
  ) => {
    const result = Array.from(relationships)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return
    }

    if (onChange) {
      const newRelationships = reorderRelationship(
        relationships,
        result.source.index,
        result.destination.index
      )
      setRelationships(newRelationships)
      onChange(JSON.stringify(newRelationships))
    }
  }

  const relationshipsDndComponent = (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {relationships.map((relationship: any, index: number) => {
              const id = `relationship-component-${index}`
              console.log(relationship)
              return (
                <Draggable key={id} draggableId={id} index={index}>
                  {(provided) => (
                    <DndItem
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div>
                        <span>{relationship.value}</span>
                        <span>{relationship.label}</span>
                      </div>
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
      {relationshipsDndComponent}
    </FieldContainer>
  )
}
