import React, { useState, useEffect, useRef } from "react"
import { navigate } from "gatsby"

import Timeline from "react-vis-timeline-2"


const nowDate = new Date()
const nowYear = nowDate.getFullYear()
const visGroups = [
  {
    id: 1,
    content: "",
  },
]
const LogTimeline = (props) => {
  const [visItems, setVisItems] = useState(null)
  const timelineRef = useRef(null)
  useEffect(() => {
    if (!visItems || visItems.length !== props.visItems.length) {
      setVisItems(
        props.visItems.map((visItem) => {
          return {
            id: visItem.id,
            start: new Date(visItem.start),
            group: 1,
            content: visItem.title,
            link: visItem.link,
          }
        })
      )
    }
  }, [props.visItems])
  useEffect(()=>{
    if (timelineRef.current && props.selectedId) {
      const moveToItem = timelineRef.current.items.get(props.selectedId)
      if (moveToItem) {
        timelineRef.current.updateSelection(props.selectedId)
        timelineRef.current.timeline.moveTo(moveToItem.start)
      }
    }
  }, [props.selectedId])
  return (
    visItems && (
      <div
        css={{
          position: "sticky",
          bottom: 0,
        }}
      >
        <Timeline
          ref={(ref)=>{
            if (!timelineRef.current && ref) {
              timelineRef.current = ref
              timelineRef.current.timeline.on('click', (_props) => {
                const itemId = _props.item
                if (itemId) {
                  const item = timelineRef.current.items.get(itemId)
                  navigate(item.link)
                }
              })
            }
          }}
          initialItems={visItems}
          initialGroups={visGroups}
          options={{
            width: "100%",
            locale: 'zh-cn',
            zoomMin: 1000 * 60 * 60 * 24 * 15,
            zoomMax: 1000 * 60 * 60 * 24 * 31 * 12 * 5,
            min: new Date(1985, 0, 1),
            max: new Date(nowYear+1, 0,1)
          }}
        />
      </div>
    )
  )
}

export default LogTimeline
