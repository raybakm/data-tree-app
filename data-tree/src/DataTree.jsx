
import React, { useState, useEffect, useCallback } from 'react'
import { treeName, initialState } from './constants'
import dataTreeAPI from './services'
import CollapseSection from './CollapseSection'

const DataTree = () => {
  const [userTreeData, setUserTreeData] = useState(initialState)
  const [selectedId, setSelectedId] = useState(initialState.id)

  const fetchData = async () => {
    let response = await dataTreeAPI.getUserTreeData(treeName)
    if (response.ok) {
      let responseJSON = await response.json()
      setUserTreeData(responseJSON)
    }
  }

  useEffect(() => {
    fetchData()
      .catch(console.error)
  }, [])

  const onChangeActiveItem = useCallback((id) => {
    setSelectedId(id)
  }, [])

  const onReloadUserTreeData = useCallback(() => {
    fetchData()
      .catch(console.error)
  }, [])

  const renderBranch = (item) => {
    const isNested = !!item.children.length
    const isSelectedItem = item.id === selectedId
    const isRootItem = item.name === treeName
    return (
      <CollapseSection
        key={item.id}
        id={item.id}
        name={item.name}
        isNested={isNested}
        isSelectedItem={isSelectedItem}
        isRootItem={isRootItem}
        onChangeActiveItem={onChangeActiveItem}
        onReloadUserTreeData={onReloadUserTreeData}
      >
        {isNested && item.children.map(item => renderBranch(item))}
      </CollapseSection>
    )
  }

  return (
    <>
      {renderBranch(userTreeData)}
    </>
  )
}

export default DataTree
