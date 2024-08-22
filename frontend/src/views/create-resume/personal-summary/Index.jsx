'use client'
import { Button, Card, CardContent, CardHeader, Divider, Grid, TextField, Typography } from "@mui/material"
// Third-party Imports
import classnames from 'classnames'
import { useEditor, EditorContent } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { Underline } from '@tiptap/extension-underline'
import { Placeholder } from '@tiptap/extension-placeholder'
import { TextAlign } from '@tiptap/extension-text-align'

// Style Imports
import '@/libs/styles/tiptapEditor.css'


// Components Imports
import CustomIconButton from '@core/components/mui/IconButton'
import { useEffect, useState } from "react"

const EditorToolbar = ({ editor }) => {
    if (!editor) {
      return null
    }
  
    return (
      <div className='flex flex-wrap gap-x-3 gap-y-1 pbs-5 pbe-4 pli-5'>
        <CustomIconButton
          {...(editor.isActive('bold') && { color: 'primary' })}
          variant='outlined'
          size='small'
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <i className={classnames('ri-bold', { 'text-textSecondary': !editor.isActive('bold') })} />
        </CustomIconButton>
        <CustomIconButton
          {...(editor.isActive('underline') && { color: 'primary' })}
          variant='outlined'
          size='small'
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <i className={classnames('ri-underline', { 'text-textSecondary': !editor.isActive('underline') })} />
        </CustomIconButton>
        <CustomIconButton
          {...(editor.isActive('italic') && { color: 'primary' })}
          variant='outlined'
          size='small'
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <i className={classnames('ri-italic', { 'text-textSecondary': !editor.isActive('italic') })} />
        </CustomIconButton>
        <CustomIconButton
          {...(editor.isActive('strike') && { color: 'primary' })}
          variant='outlined'
          size='small'
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <i className={classnames('ri-strikethrough', { 'text-textSecondary': !editor.isActive('strike') })} />
        </CustomIconButton>
        <CustomIconButton
          {...(editor.isActive({ textAlign: 'left' }) && { color: 'primary' })}
          variant='outlined'
          size='small'
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
        >
          <i className={classnames('ri-align-left', { 'text-textSecondary': !editor.isActive({ textAlign: 'left' }) })} />
        </CustomIconButton>
        <CustomIconButton
          {...(editor.isActive({ textAlign: 'center' }) && { color: 'primary' })}
          variant='outlined'
          size='small'
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
        >
          <i
            className={classnames('ri-align-center', {
              'text-textSecondary': !editor.isActive({ textAlign: 'center' })
            })}
          />
        </CustomIconButton>
        <CustomIconButton
          {...(editor.isActive({ textAlign: 'right' }) && { color: 'primary' })}
          variant='outlined'
          size='small'
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
        >
          <i
            className={classnames('ri-align-right', {
              'text-textSecondary': !editor.isActive({ textAlign: 'right' })
            })}
          />
        </CustomIconButton>
        <CustomIconButton
          {...(editor.isActive({ textAlign: 'justify' }) && { color: 'primary' })}
          variant='outlined'
          size='small'
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
        >
          <i
            className={classnames('ri-align-justify', {
              'text-textSecondary': !editor.isActive({ textAlign: 'justify' })
            })}
          />
        </CustomIconButton>
      </div>
    )
  }

  const PersonalSummary = ({allData}) => {

    const [data , setData] = useState('')
    const editor = useEditor({
        extensions: [
          StarterKit,
          Placeholder.configure({
            placeholder: 'Write something here...'
          }),
          TextAlign.configure({
            types: ['heading', 'paragraph']
          }),
          Underline
        ],
        content: `
         
        `
      })
      const fetchSummaries = async () => {
        const response = await fetch('/api/generatesummary', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            experiences:allData.experiences,
            skills: allData.skills,
            Projects: [
              
            ],
            Certifications: [
             
            ]
          })
        })
  
        const data = await response.json()
        try {
          console.log('data : ', data)
          const parsedSummaries = JSON.parse(data.summaries)
          console.log('parse : ', parsedSummaries)
          setData(parsedSummaries[0] || "")
        } catch (error) {
          console.error('Failed to parse summaries:', error)
          setData([data.summaries])
        }
      }



      useEffect(() => {
        if (editor) {
          const typingEffect = async (content) => {
            let index = 0;
            while (index <= content.length) {
              editor.commands.setContent(content.slice(0, index));
              index++;
              await new Promise((resolve) => setTimeout(resolve, 30)); // Adjust typing speed
            }
          };
    
          typingEffect(data);
        }
      }, [editor, data]);



    return (
        
        <>
        
          <CardHeader title='Summary'   action={
          <>
            <Button
              variant='contained'
              aria-haspopup='true'
              onClick={()=>{
                fetchSummaries()
              }}
            >
              Generate
            </Button>
          </>
        } />
          <CardContent>
            <Card className='p-0 border shadow-none'>
              <CardContent className='p-0'>
              <EditorToolbar editor={editor} />
            <Divider className='mli-5' />
            <EditorContent editor={editor} className='bs-[135px] overflow-y-auto flex ' />
              </CardContent>
            </Card>
          </CardContent>
          </>
      )
}

export default PersonalSummary