
import React, { useState, memo } from 'react'
import './CollapseSection.css'
import { Collapse } from '@mui/material'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined'
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { treeName } from './constants'
import dataTreeAPI from './services'
import Modal from './Modal'

const CollapseSection = memo(({
  id,
  name,
  isNested,
  isSelectedItem,
  isRootItem,
  onChangeActiveItem,
  onReloadUserTreeData,
  children
}) => {
  const [isCollapseSectionOpen, setIsCollapseSectionOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalSettings, setModalSettings] = useState({})

  const handleListItemBtnClick = () => {
    setIsCollapseSectionOpen(!isCollapseSectionOpen)
    onChangeActiveItem(id)
  }

  const createNode = async (nodeName) => {
    await dataTreeAPI.createTreeNode(treeName, id, nodeName)
  }

  const handleAddItemBtnClick = (e) => {
    e.stopPropagation()
    const modalInfo = {
      currentNodeName: '',
      title: 'Add',
      contentText: null,
      inputLabel: 'Node Name',
      cancelBtnTitle: 'CANCEL',
      submitBtnTitle: 'ADD',
      onSubmitAction(nodeName) {
        createNode(nodeName)
          .then(() => onReloadUserTreeData())
          .catch(console.error)
      }
    }
    setModalSettings(modalInfo)
    setIsModalOpen(true)
  }

  const editNode = async (nodeName) => {
    await dataTreeAPI.renameTreeNode(treeName, id, nodeName)
  }

  const handleEditItemBtnClick = (e) => {
    e.stopPropagation()
    const modalInfo = {
      currentNodeName: name,
      title: 'Rename',
      contentText: null,
      inputLabel: 'New Node Name',
      cancelBtnTitle: 'CANCEL',
      submitBtnTitle: 'RENAME',
      onSubmitAction(nodeName) {
        editNode(nodeName)
          .then(() => onReloadUserTreeData())
          .catch(console.error)
      }
    }
    setModalSettings(modalInfo)
    setIsModalOpen(true)
  }

  const removeNode = async () => {
    let response = await dataTreeAPI.deleteTreeNode(treeName, id)
    if (response.status === 500) {
      let responseJSON = await response.json()
      if (responseJSON?.data?.message) {
        const modalInfo = {
          currentNodeName: name,
          title: 'Delete',
          contentText: responseJSON.data.message,
          inputLabel: null,
          cancelBtnTitle: 'CLOSE',
          submitBtnTitle: null,
          onSubmitAction() {}
        }
        setModalSettings(modalInfo)
        setIsModalOpen(true)
      }
    }
  }

  const handleRemoveItemBtnClick = (e) => {
    e.stopPropagation()
    const modalInfo = {
      currentNodeName: name,
      title: 'Delete',
      contentText: `Do you want to delete ${name}?`,
      inputLabel: null,
      cancelBtnTitle: 'CANCEL',
      submitBtnTitle: 'DELETE',
      onSubmitAction() {
        removeNode()
          .then(() => onReloadUserTreeData())
          .catch(console.error)
      }
    }
    setModalSettings(modalInfo)
    setIsModalOpen(true)
  }

  return (
    <>
      <List component='div' className='list' >
        <ListItemButton className='list-item-button' onClick={handleListItemBtnClick} >
          <ListItemIcon className='list-item-icon'>
            {isNested && (isCollapseSectionOpen ? <ChevronRightOutlinedIcon /> : <ExpandMoreOutlinedIcon />)}
          </ListItemIcon >
          <ListItemText primary={isRootItem ? 'Root' : name} className='list-item-text' />
          {isSelectedItem && (
            <ListItemIcon>
              <AddCircleOutlineOutlinedIcon color='primary' className='list-action-icon' onClick={handleAddItemBtnClick} />
              {!isRootItem && (
                <>
                  <EditOutlinedIcon color='primary' className='list-action-icon' onClick={handleEditItemBtnClick} />
                  <DeleteForeverIcon color='error' className='list-action-icon' onClick={handleRemoveItemBtnClick} />
                </>
              )}
            </ListItemIcon>
          )}
        </ListItemButton>
        <Collapse in={isCollapseSectionOpen}>
          {children}
        </Collapse>
      </List>
      <Modal
        isModalOpen={isModalOpen}
        onCloseModal={() => setIsModalOpen(false)}
        modalSettings={modalSettings}
      />
    </>
  )
})

export default CollapseSection
