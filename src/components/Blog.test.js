import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    likes: 20
  }

  const mockHandler = jest.fn()

  const component = render (
    <Blog blog={blog} updateBlog={mockHandler} />
  )

  const button = component.getByText('Like')
  fireEvent.click(button)

  const div = component.container.querySelector('div')
  console.log(prettyDOM(div))

  /*expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
*/
  expect(mockHandler.mock.calls).toHaveLength(1)
})