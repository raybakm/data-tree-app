
import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

const Modal = ({
  isModalOpen,
  onCloseModal,
  modalSettings: {
    currentNodeName,
    title,
    contentText,
    inputLabel,
    cancelBtnTitle,
    submitBtnTitle,
    onSubmitAction
  }
}) => {
  const [nodeName, setNodeName] = useState('')

  useEffect(() => {
    if (currentNodeName !== undefined) {
      setNodeName(currentNodeName)
    }
  }, [currentNodeName])

  const handleSubmit = () => {
    onSubmitAction(nodeName)
    setNodeName('')
    onCloseModal()
  };

  return (
    <>
      <Dialog
        open={isModalOpen}
        fullWidth
        maxWidth='sm'
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            {contentText}
          </DialogContentText>
          {!!inputLabel && (
            <TextField
              margin='dense'
              name='nodeName'
              label={inputLabel}
              value={nodeName}
              onChange={e => setNodeName(e.target.value)}
              type='text'
              fullWidth
              variant='outlined'
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button
            variant='outlined'
            onClick={onCloseModal}
            fullWidth={!submitBtnTitle ? true : false}
          >
            {cancelBtnTitle}
          </Button>
          {!!submitBtnTitle && (
            <Button
              type='submit'
              variant={!!contentText ? 'outlined' : 'contained'}
              color={!!contentText ? 'error' : 'primary'}
              onClick={handleSubmit}
            >
              {submitBtnTitle}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Modal
