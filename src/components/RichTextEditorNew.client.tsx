// import { ComponentPropsWithRef, forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
// import ReactQuill, { Quill } from 'react-quill-new'

// // @ts-expect-error VideoBlot not compatible with Quill
// import BlotFormatter from 'quill-blot-formatter/dist/BlotFormatter'
// // @ts-expect-error VideoBlot not compatible with Quill
// import AlignAction from 'quill-blot-formatter/dist/actions/align/AlignAction'
// // @ts-expect-error VideoBlot not compatible with Quill
// import DeleteAction from 'quill-blot-formatter/dist/actions/DeleteAction'
// // @ts-expect-error VideoBlot not compatible with Quill
// import ResizeAction from 'quill-blot-formatter/dist/actions/ResizeAction'
// // @ts-expect-error VideoBlot not compatible with Quill
// import ImageSpec from 'quill-blot-formatter/dist/specs/ImageSpec'

// import hljs from 'highlight.js'
// import 'highlight.js/styles/atom-one-dark.min.css'

// Quill.register('modules/blotFormatter', BlotFormatter)

// class CustomImageSpec extends ImageSpec {
// 	getActions() {
// 		return [AlignAction, DeleteAction, ResizeAction]
// 	}
// }

// const BlockEmbed = Quill.import('blots/block/embed')

// // @ts-expect-error VideoBlot not compatible with Quill
// class DividerBlot extends BlockEmbed {
// 	static blotName = 'divider'
// 	static tagName = 'hr'
// }

// // @ts-expect-error moodyu
// Quill.register(DividerBlot)

// type RichTextEditorNewProps = ComponentPropsWithRef<typeof ReactQuill> & {
// 	ref?: React.Ref<ReactQuill>
// }

// const RichTextEditorNew = forwardRef<ReactQuill, RichTextEditorNewProps>(function RTEComponent(
// 	props,
// 	ref,
// ) {
// 	const quillRef = useRef<ReactQuill | null>(null)

// 	useEffect(() => {
// 		if (!quillRef.current) return

// 		const quill = quillRef.current?.getEditor()
// 		const toolbar = quill.getModule('toolbar')
// 		// @ts-expect-error toolbar.addhandlder
// 		toolbar.addHandler('divider', dividerHandler)

// 		function dividerHandler() {
// 			const range = quill.getSelection(true)
// 			quill.insertEmbed(range.index, 'divider', Quill.sources.USER)
// 			quill.setSelection(range.index + 2, Quill.sources.SILENT)
// 		}
// 	}, [])

// 	useImperativeHandle(
// 		ref,
// 		() => ({
// 			editor: quillRef.current?.editor,
// 			// @ts-expect-error undefined or Value
// 			getEditorContents() {
// 				if (quillRef.current) return quillRef.current.getEditorContents()
// 			},
// 			// @ts-expect-error undefined or Value
// 			getEditorSelection() {
// 				if (quillRef.current) return quillRef.current?.getEditorSelection()
// 			},
// 		}),
// 		[],
// 	)

// 	return (
// 		<ReactQuill
// 			theme="snow"
// 			ref={quillRef}
// 			modules={{
// 				syntax: { hljs },
// 				toolbar: [
// 					[{ header: [1, 2, 3, 4, 5, 6, false] }],
// 					[
// 						'bold',
// 						'italic',
// 						'underline',
// 						'strike',
// 						'blockquote',
// 						'code',
// 						'divider',
// 						{ script: 'sub' },
// 						{ script: 'super' },
// 					],
// 					[{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
// 					[{ color: [] }, { background: [] }],
// 					[
// 						{ list: 'ordered' },
// 						{ list: 'bullet' },
// 						{ list: 'check' },
// 						{ indent: '-1' },
// 						{ indent: '+1' },
// 					],
// 					['code-block'],
// 					['link', 'image', 'video'],
// 					['clean'],
// 				],
// 				blotFormatter: {
// 					specs: [CustomImageSpec],
// 					overlay: {
// 						style: {
// 							border: '2px solid red',
// 						},
// 					},
// 				},
// 			}}
// 			formats={[
// 				'header',
// 				'bold',
// 				'italic',
// 				'underline',
// 				'strike',
// 				'blockquote',
// 				'list',
// 				'indent',
// 				'link',
// 				'align',
// 				'image',
// 				'video',
// 				'code',
// 				'code-block',
// 				'color',
// 				'background',
// 				'script',
// 				'divider',
// 			]}
// 			value={props.value}
// 			onChange={props.onChange}
// 		/>
// 	)
// })

// export default RichTextEditorNew
