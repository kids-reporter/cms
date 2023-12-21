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

export type RelationshipInfo = {
  id: string
  label: string
}

export const Field = ({
  field,
  value,
  onChange,
}: FieldProps<typeof controller>) => {
  const [prevValue, setPrevValue] = useState(value)
  const [relationships, setRelationships] = useState<RelationshipInfo[]>(
    value ? JSON.parse(value) : []
  )

  // Pattern for monitoring props change:
  // https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
  if (value !== prevValue) {
    setPrevValue(value)
    setRelationships(value ? JSON.parse(value) : [])
  }

  const reorderRelationship = (
    relationships: RelationshipInfo[],
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
            {relationships.map((relationship, index) => {
              const id = `relationship-component-${index}`
              return (
                <Draggable key={id} draggableId={id} index={index}>
                  {(provided) => (
                    <DndItem
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <span>
                        {index + 1}. {relationship.label}
                      </span>
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
