define([
	'fontoxml-families/configureProperties',
	'fontoxml-families/createElementMenuButtonWidget',
	'fontoxml-families/createMarkupLabelWidget',
	'fontoxml-localization/t',
	'fontoxml-table-flow-cals/configureAsCalsTableElements'
], function (
	configureProperties,
	createElementMenuButtonWidget,
	createMarkupLabelWidget,
	t,
	configureAsCalsTableElements
) {
	'use strict';

	return function configureSxModule (sxModule) {
		// CALS table
		configureAsCalsTableElements(sxModule, {
			table: {
				localName: 'table'
			},
			entry: {
				defaultTextContainer: 'p'
			}
		});

		// colspec
		//     The <colspec> element contains a column specification for a table, including assigning a column name
		//     and number, cell content alignment, and column width. Category: Table elements
		configureProperties(sxModule, 'self::colspec', {
			markupLabel: t('columns')
		});

		// entry
		//     The <entry> element defines a single cell in a table. Category: Table elements
		configureProperties(sxModule, 'self::entry', {
			contextualOperations: [
				{ name: 'contextual-column-insert' },
				{ name: 'contextual-column-after-insert' },
				{ name: 'contextual-column-delete' },
				{ name: 'contextual-row-insert' },
				{ name: 'contextual-row-after-insert' },
				{ name: 'contextual-row-delete' }
			],
			markupLabel: t('cell')
		});
		configureProperties(sxModule, 'self::entry[fonto:get-column-index(.) = 0 and ancestor::table[1][@rowheader="firstcol"]]', {
			backgroundColor: 'black'
		});

		// row
		//     The <row> element contains a single row in a table <tgroup>. Category: Table elements
		configureProperties(sxModule, 'self::row', {
			markupLabel: t('row')
		});

		// table
		configureProperties(sxModule, 'self::table', {
			contextualOperations: [
				{ name: ':cals-table-insert-title' },
				{ name: ':cals-table-insert-desc' },
				{ name: 'cals-table-delete' }
			],
			markupLabel: t('table figure'),
			titleQuery: './title',
			blockHeaderLeft: [
				createMarkupLabelWidget()
			],
			blockOutsideAfter: [
				createElementMenuButtonWidget()
			]
		});

		// tbody
		//     The <tbody> element contains the rows in a table. Category: Table elements
		configureProperties(sxModule, 'self::tbody', {
			markupLabel: t('body')
		});

		// tgroup
		//     The <tgroup> element in a table contains column, row, spanning, header and footer specifications,
		//     and the body (<tbody>) of the table. Category: Table elements
		configureProperties(sxModule, 'self::tgroup', {
			markupLabel: t('table'),
			tabNavigationItemSelector: 'self::entry'
		});

		// thead
		//     The table header (<thead>) element precedes the table body (<tbody>) element in a complex table.
		//     Category: Table elements
		configureProperties(sxModule, 'self::thead', {
			markupLabel: t('header')
		});
	};
});
