/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// The editor creator to use.
import { ClassicEditor as ClassicEditorBase } from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

import { Essentials } from '@ckeditor/ckeditor5-essentials/src/essentials';
import { CKFinderUploadAdapter as UploadAdapter } from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter';
import { Autoformat } from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import { Bold } from '@ckeditor/ckeditor5-basic-styles/src/bold';
import { Italic } from '@ckeditor/ckeditor5-basic-styles/src/italic';
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import { CKFinder } from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';
import { EasyImage } from '@ckeditor/ckeditor5-easy-image/src/easyimage';
import { Heading } from '@ckeditor/ckeditor5-heading/src/heading';
import { AutoImage } from '@ckeditor/ckeditor5-image/src/autoimage';
import { Image } from '@ckeditor/ckeditor5-image/src/image';
import { ImageResize } from '@ckeditor/ckeditor5-image/src/imageresize';
import { ImageInsert } from '@ckeditor/ckeditor5-image/src/imageinsert';
import { ImageResizeEditing } from '@ckeditor/ckeditor5-image/src/imageresize/imageresizeediting';
import { ImageCaption } from '@ckeditor/ckeditor5-image/src/imagecaption';
// import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import { ImageInline as ImageInlineEditing } from '@ckeditor/ckeditor5-image/src/imageinline';
import { ImageToolbar } from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import { ImageUpload } from '@ckeditor/ckeditor5-image/src/imageupload';
import { Indent } from '@ckeditor/ckeditor5-indent/src/indent';
import { Link } from '@ckeditor/ckeditor5-link/src/link';
import { List } from '@ckeditor/ckeditor5-list/src/list';
import { MediaEmbed } from '@ckeditor/ckeditor5-media-embed/src/mediaembed';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import { PasteFromOffice } from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
import { Table } from '@ckeditor/ckeditor5-table/src/table';
import { TableToolbar } from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import { TextTransformation } from '@ckeditor/ckeditor5-typing/src/texttransformation';
import { SourceEditing } from '@ckeditor/ckeditor5-source-editing/src/sourceediting'
import { SimpleUploadAdapter } from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter';
import { CloudServices } from '@ckeditor/ckeditor5-cloud-services/src/cloudservices';
import { ImageBlock, ImageBlockEditing, ImageStyle } from '@ckeditor/ckeditor5-image';

import { Highlight } from '@ckeditor/ckeditor5-highlight/src/highlight';

// import Base64UploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter';
import LineHeight from './custom/lineHeight';
import CustomImageStyleUI from './custom/customImageStyle';

export default class ClassicEditor extends ClassicEditorBase { }

// Plugins to include in the build.
ClassicEditor.builtinPlugins = [
	Essentials,
	UploadAdapter,
	Autoformat,
	Bold,
	Italic,
	BlockQuote,
	CKFinder,
	EasyImage,
	Heading,
	Image,
	ImageCaption,
	ImageToolbar,
	ImageUpload,
	ImageResize,
	ImageResizeEditing,
	ImageStyle,
	Indent,
	Link,
	List,
	MediaEmbed,
	Paragraph,
	PasteFromOffice,
	Table,
	TableToolbar,
	TextTransformation,
	SourceEditing,
	SimpleUploadAdapter,
	// Base64UploadAdapter,
	CloudServices,
	ImageInsert,
	AutoImage,
	ImageBlock,
	ImageBlockEditing,
	ImageInlineEditing,
	LineHeight,
	// CustomImageStyleUI
	Highlight
];

// Editor configuration.
ClassicEditor.defaultConfig = {
	toolbar: {
		items: [
			'imageStyle',
			'heading',
			'|',
			'bold',
			'italic',
			'link',
			'highlight',
			'bulletedList',
			'numberedList',
			'|',
			'lineHeight',
			'indent',
			'outdent',
			'|',
			'insertImage',
			'insertImageViaUrl',
			'imageUpload',
			'sourceEditing',
			'blockQuote',
			'insertTable',
			'mediaEmbed',
			'undo',
			'redo'
		]
	},
	highlight: {
		options: [
			{
				model: 'yellowMarker',
				class: 'marker-yellow',
				title: 'Yellow highlight',
				color: 'var(--ck-highlight-marker-yellow)',
				type: 'marker'
			}
		]
	},
	image: {
		toolbar: [
			'imageStyle:side',
			'imageStyle:inline',
			'imageStyle:alignLeft',
			'imageStyle:alignCenter',
			'imageStyle:alignRight',
			// 'imageStyle:wrapText',
			// 'imageStyle:breakText',
			'|',
			'toggleImageCaption',
			'imageTextAlternative',
		],
		resizeUnit: 'px',
		stylesAttributes: {
			'width': 'width',
			'height': 'height'
		}
	},
	table: {
		contentToolbar: [
			'tableColumn',
			'tableRow',
			'mergeTableCells'
		]
	},
	// This value must be kept in sync with the language defined in webpack.config.js.
	language: 'en'
};
