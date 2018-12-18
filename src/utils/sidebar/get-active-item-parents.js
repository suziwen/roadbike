const isParentActive = (sections, parentUid) => {
  for (let section of sections) {
    if (section.uid === parentUid) return section
    if (section.items) {
      for (let items of section.items) {
        const activeSubItem = isParentActive([items], parentUid)
        if (activeSubItem) return activeSubItem
      }
    }
  }

  return false
}

const getActiveItemParents = (itemList, activeItemLink, activeItemParents) => {
  if (activeItemLink.parentUid) {
    const bar = isParentActive(itemList, activeItemLink.parentUid)
    activeItemParents.push(bar.uid)
    return getActiveItemParents(itemList, bar, activeItemParents)
  } else {
    return activeItemParents
  }
}

export default getActiveItemParents
