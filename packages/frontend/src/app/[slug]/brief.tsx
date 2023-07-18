type BriefProp = {
  content: any
}

export const Brief = (props: BriefProp) => {
  // TODO: brief author
  return (
    <div className="post-intro">
      {props.content?.blocks?.map(
        (block: any, index: number) =>
          block?.text && <p key={`brief-paragraph-${index}`}>{block.text}</p>
      )}
    </div>
  )
}

export default Brief
