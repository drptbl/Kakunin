##Navigation

###`I visit the ":pageFileName" page`

Visits the url of the page object with `:pageFileName` name.

In order to make it work we create a page object file with a name of `:pageFileName`.

For example in case of: `I visit the "myPage" page` there should be a file `myPage.js` inside the `pages` directory.

If we have a page object with a name `somePageObject.js` defined inside `pages` directory then:

`Given I visit the "somePageObject" page`

will set `this.currentPage` variable to `somePageObject` page and we should end up on `somePageObject` url.

###`I visit the ":pageFileName" page with parameters:`

The same as `I visit the ":pageFileName" page` except allows to pass url parameters.

If url of `myPage` is defined as `this.url = /orders/:orderId/products/:productId` then we can use this step to visit this page by:

```gherkin
I visit the "myPage" page with parameters:
    | orderId   | 1 |
    | productId | 2 |
```

this will result in visiting the `/orders/1/product/2` page.

### `the ":pageFileName" page is displayed`

Checks if current browser url matches url of `pageFileName` page object. 

If the url matches expected pattern then 
`this.currentPage` variable is set to `pageFileName` page object.

##Forms
###`I fill the ":formName" form with:`

Allows to fill the form with the name `:formName` and values provided as an array of inputs and values. The element with name `:formName` must be defined inside the 
`currentPage` page object.

Input and values should be provided as an array for example:

```gherkin
I fill the "myForm" form with:
  | inputElement    | value to be typed into field        |
  | textareaElement | value to be typed into textarea     |
  | radioElement    | radio value to be selected          |
  | checkboxElement | checkbox label value to be selected |
```

By default we support all basic HTML field types (text inputs, checkboxes, radios, selects, files and textareas)

In order to use the default handlers the elements you use as input must follow pattern:

For inputs:

`this.element = $('input')` - element should point at input you want to fill

For textareas:

`this.element = $('textarea')` - element should point at textarea you want to fill

For file input:

`this.element = $('input')` - element should point at input you want to fill and value should a filename of file from `data` directory

For selects:

`this.element = $('select')` - element should point at select and value should be an value of expected option

For radios:

`this.element = $$('radio[name="name-of-radio"]')` - element should be an array of all radio input of given name and value should be an value of radio you wish to select

For checkboxes:

Checkbox should have a html like:

```html
<label>
  My checkbox
  <input type="checkbox" name="some-name"/>
</label>  
```

`this.element = $$('checkbox[name="name-of-radio"]')` - element should be an array of all checkboxes of given name and value should be a text from label of checkbox you want to fill


You can use all kind of transformers to as a values for fields.

###`the ":formName" form is filled with:`

The same as `I fill the ":formName" form with:` but allows to check if a form is filled with a given set of values.

You can use all kind of transformers to as a expected values for fields.

The only difference is for file fields. You cannot check uploaded files just like that, however we prepared a special type of handler
that allow to check for some information related to a specific file.

Let's assume that after upload we display an information with a file name of a uploaded file.

You can use a special handler that requires to set a element with a postfix `Uploaded`. This will check if a value of that element is the same as you expected.

For example you can write a step like this:

```gherkin 
the "myform" form is filled with:
  | myFileUploaded | file.txt |
```

Keep in mind that the element name must end with `Uploaded` for example:

`this.myFileUploaded = $('p.some-file')`

###`the error messages should be displayed:` 

Allows you to specify the error messages that should be displayed for a specific elements.

This step requires an array of format:

```gherkin 
the error messages should be displayed:
  | element   | errorMessage     |
  | myElement | my error message |
```

Keep in mind that first row of array must be `| element | errorMessage |`.

You can use dictionaries in this step as follows:

```gherkin
the error messages should be displayed:
  | element   | errorMessage                   |
  | myElement | d:dictionaryName:dictionaryKey |
```

##Elements
###`I wait for ":expectedConditionName" of the ":elementName" element`

Waits till element `:elementName` from `this.currentPage` meets criteria specified by `:expectedConditionName`.

You can use any of the Protractor's expected condition:

* `visibilityOf`
* `invisibilityOf`

etc.

Read more in Protractor's API documentation.

###`I wait for the ":elementName" element to disappear`

Waits till element `:elementName` disappears.

###`I scroll to the ":elementName" element`

Scrolls to element `:elementName` of `this.currentPage`. The element will be on bottom of the page.

###`I infinitely scroll to the ":elementName" element`

Allows to scroll till `:elementName` is visible. Useful for infinite scrolling functionality.

###`I press the ":keyName" key`

Performs a key press operation on `:keyName` key.

###`I click the ":elementName" element`

Performs a click action on element `:elementName` from `this.currentPage'

###`I click the ":elementName" element if it is visible`

Conditionally clicks on element `:elementName` of `this.currentPage` only if it is visible.

###`I click the ":elementName" on the first item of ":containerElementName" element`

Allows to click on the first child element of `:containerElementName` specified in `this.currentName`.

The child element must be specified by `:elementName` nd must be available in `this.currentPage`

###`I store the ":elementName" element text as ":variableName" variable`

Stores the text from element `:elementName` of `this.currentPage` under the `:variableName` so you can use it later.

###`I update the ":elementName" element text as ":variableName" variable`

Updates the variable `:variableName` value by value from element `:elementName` of `this.currentPage`.

###`I store the ":elementName" element text matched by ":matchingRegex" as ":variableName" variable`

Stores the part of the element `:elementName` text, that matches the `:matchingRegex` under the `:variableName` for later use.

### `the ":elementName"" element is present`

Checks if element `:elementName` is available in HTML DOM

### `the ":elementName"" element is not present`

Checks if element `:elementName` is not available in HTML DOM

### `the ":elementName"" element is visible`

Checks if element `:elementName` is visible and clickable

### `the ":elementName"" element is not visible`

Checks if element `:elementName` is available in HTML DOM but is not visible and clickable

### `the ":elementName" element is disabled`

Checks if element is disabled

### `I store table ":tableElementName" rows as ":variableName" with columns:`

Allows to store a row specified columns from a table `:tableElementName` and save it under `:variableName` as an array of objects.

This step requires a table of columns locators, for example:

```gherkin
I store table "myTable" rows as "someVariable" with columns:
  | firstName |
  | lastName  |
  | id        |
```

In order to make it work there must be not only element `myTable` in `this.currentPage`, but also
locator `this.firstName = by.css('.firstName');` and so on.

The result of this step is an array of:

```json 
[
  [
    'firsRowFirstNameValue',
    'firsRowLastNameValue'
    'firsRowIdValue'
  ]
  ...
]
```

###`there are following elements in table ":elementName":`

Allows to check if a child elements of `:elementName` have a specified content.

This steps allows you to specify an array of child elements locators that will be checked against expected values.

For example:

```gherkin 
there are following elements in table "myTable":
  | id  | firstName | lastName |
  | t:1 | t:Adam    | t:Doe    |
  | t:2 | t:John    | t:Doe    |
```

First row must specify columns locators. Starting from second row we must provider a matchers for each row that must be displayed.

This step checks exact match, so if the table has 5 rows, there must be a 5 rows in this table.

We can specify only a set of columns (for example if a table has 5 columns, we can specify only 1).

###`there are "numberExpression" following elements for element ":elementName":`

Allows to check if a child elements of `:elementName` have a specified content. Element should be an array, for example:

```html 
<table>
  <tr>
    <td>1</td>
  </tr>
  <tr>
    <td>2</td>
  </tr>   
</table>
```

for this case the `:elementName` should be specified as `$$('table tr')`.

Allows to check if a number of elements is the one that we expect.

`numberExpression` is a supported expression from `chai.js` library:

* `equal N` where N is a number

* `at least N` where N is a number

* `above N` where N is a number

* `below N` where N is a number

* `within N M` where N and M are a numbers

and so on. You can check expressions on `chai.js` API dock for BDD.

This step requires an array of elements locators to be checked. For example:

```gherkin 
there are "equal 5" following elements for element "myList":
  | element    | value         |
  | viewButton | f:isClickable |
  | id         | r:idRegex     |
```

The first row must be `| element    | value |`, after that we specify a list of element locators to be checked for each element of `:elementName` array.

The child elements must be a locators, for example `this.viewButton = by.css('button.viewButton');`.

You can use all kind of matchers here.

###`there is element ":elementName" with value ":matcher"`

Allows to check if `:elementName` has a value that matches the `:matcher`.

###`there is no element ":elementName" with value ":matcherName"`

Allows to check if there is no `:elementName` that matches the `:matcher`.

###`there are "numberExpression" ":elementName" elements`

Allows to check if a number of `:elementName` elements is the same as we expect.

`numberExpression` is a supported expression from `chai.js` library:

* `equal N` where N is a number

* `at least N` where N is a number

* `above N` where N is a number

* `below N` where N is a number

* `within N M` where N and M are a numbers

and so on. You can check expressions on `chai.js` API dock for BDD.

`:elementName` should be specified as an array, for example:

```html 
<table>
  <tr>
    <td>1</td>
  </tr>
  <tr>
    <td>2</td>
  </tr>   
</table>
```

for this case the `:elementName` should be specified as `$$('table tr')`.

###`every ":elementName" element should have the same value for element ":columnElementName"`

Allows to check if every row defined by `:elementName` has the same value for a column `:columnElementName`.

`:elementName` must be an array of elements

`:columnElementName` must be an locator, for example:

```html 
<table>
  <tr>
    <td>1</td>
  </tr>
  <tr>
    <td>1</td>
  </tr>   
</table>
```

for this case the `:elementName` should be specified as `$$('table tr')` and we can specify column locator
`this.myColumn = by.css('td');`. This allows us to write:

`every "myElement" element should have the same value for element "myColumn"`

###`every ":elementName" element should have the same value for element ":columnElementName" attribute ":attributeName"`

The same as `every ":elementName" element should have the same value for element ":columnElementName"`, but check if all cells have the same value for an
attribute specified by `:atrributeName`.

###`":columnElementName" value on the ":elementName" list is sorted in "ascending|descending" order`

Checks if the values for column `:columnElementName` of each row specified by `:elementName` is sorted in either ascending or descending order.

`:columnElementName` must be a locator used to get a column on each row of an array `:elementName`. For example:

```html 
<table>
  <tr>
    <td>1</td>
  </tr>
  <tr>
    <td>2</td>
  </tr>   
</table>
```

The `:elementName` should be specified as `this.myElement = $$('table tr')`

The `:columnElementName` should be an locator `this.myColumn = by.css(td);`.

Now we can use this step to check the order of elements.

##Emails
###`the email has been sent and contains:`

Checks if there is an email on the configured mailing service.

This steps requires an array of filters to be applied to mailbox in order to find an email you're looking for.

You can do this like this:

```gherkin 
the email has been sent and contains:
| html_body | t:some value | | |
```

The number of columns is always 4, but depending form a filter you have to use all of them or only some.

We do support filtering by any property returned in MailTrap Api response format. Go check `Extending Kakunin` for more information.

There are 2 custom filters:

```gherkin 
the email has been sent and contains:
| currentUser | | | |
```

This one checks if the user saved in `this.currentUser` variable is a recipient of an email. This is done by comparing `email` property of `this.currentUser` object to the one returned by email.

```gherkin 
the email has been sent and contains:
| file | t:fileName | r:fileExtension | sizeInBytes |
```

This one is looking for an attachment with a name matching `t:fileName`, extension matching `r:fileExtension`, `sizeInBytes` as a minimum bytes size.

You can use the same filter multiple times:

```gherkin 
the email has been sent and contains:
| file | t:fileName      | r:fileExtension | sizeInBytes |
| file | t:otherfileName | r:fileExtension | sizeInBytes |
```

This will look for an email with 2 attachments.

##Files
### `the file ":fileName" should be downloaded`

Checks if a file with name `:fileName` was downloaded.

This step does not support matchers or regular expressions, so the name must be exact match. However you can use
variable store here.

Let's assume there is a variable `myFile` with a value `super-file` in variable store.

You can write `the file "v:myFile.zip" should be downloaded` to check if a file `super-file.zip` was downloaded. 

###`the file ":fileName" contains table data stored under ":variableName" variable`

This step allows you to compare an xls/xlsx file `:fileName` with an existing data stored under `:variableName` variable.

The data under `:variableName` must be an array of objects representing each row of file. 

##Generators
### `I generate random ":generatorName" as ":variableName"`

Allows to generate a random value using the generator specified by `:generatorName`.

The generator must be defined inside the any of the `generators` directories specified in `kakunin.conf.js` file `default: generators`.

If the generator exists, then the value will be saved under the `:variableName` and can be accessed by:

* steps using variable store

* by calling `variableStore.getVariableValue(:variableName)`

* by using variable store transformer on supported steps `v:variableName`

### `I generate random ":generatorName" ":generatorParamter" as ":variableName"`

The same as `I generate random ":generatorName" as ":variableName"` but allows to pass additional parameter to generator.

##Debug

###`I pause`

Pauses tests execution and allows to continue manually by pressing combination of `ctrl+c` inside terminal.

###`I wait for ":seconds" seconds`

Waits with execution of next step for an amount provided by parameter `:seconds`.
