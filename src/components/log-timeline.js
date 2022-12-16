import React, { useState, useEffect, useRef } from "react"
import { navigate } from "gatsby"

import moment from 'moment'
import "moment/locale/zh-cn"

import Timeline from "react-vis-timeline-2"
import presets, { colors } from "../utils/presets"


const nowDate = new Date()
const nowMoment = moment()
const nowYear = nowDate.getFullYear()
const visGroups = [
  {
    id: 1,
    content: "",
  },
]
const LogTimeline = (props) => {
  const [visItems, setVisItems] = useState(
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
  const timelineRef = useRef(null)
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
          background: `linear-gradient(0deg, ${colors.ui.whisper} 25%, transparent)`,
          ".vis-timeline .vis-time-axis .vis-grid.vis-minor": { border: 0},
          ".vis-timeline .vis-foreground .vis-group": {border: 0},
          ".vis-timeline .vis-time-axis .vis-grid.vis-major": {border: 0},
          ".vis-timeline": {border: 0},
        }}
      >
        <Timeline
          ref={timelineRef}
          initialItems={visItems}
          initialGroups={visGroups}
          options={{
            width: "100%",
            locale: 'zh-cn',
            moment: moment,
            zoomMin: 1000 * 60 * 60 * 24 * 15,
            zoomMax: 1000 * 60 * 60 * 24 * 31 * 12 * 5,
            onInitialDrawComplete: ()=> {
              if (timelineRef.current) {
                const moveToItem = timelineRef.current.items.get(props.selectedId)
                timelineRef.current.timeline.setWindow(new Date(nowYear - 1, 11,1), new Date(nowYear + 1, 0,1), null, ()=>{
                  if (moveToItem) {
                    timelineRef.current.updateSelection(props.selectedId)
                    timelineRef.current.timeline.moveTo(moveToItem.start)
                  }
                })
                timelineRef.current.timeline.on('click', (_props) => {
                  const itemId = _props.item
                  if (itemId) {
                    const item = timelineRef.current.items.get(itemId)
                    navigate(item.link)
                  }
                })
              }
            },
            min: new Date(1985, 0, 1),
            max: new Date(nowYear+1, 0,1)
          }}
        />
      </div>
    )
  )
}

export default LogTimeline
