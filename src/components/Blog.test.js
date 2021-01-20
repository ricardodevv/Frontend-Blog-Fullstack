import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'
import Togglable from './Togglabe'
import BlogForm from './BlogForm'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    likes: 20
  }

  const mockHandler = jest.fn()

  const component = render(
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

describe('togglabe test', () => {
  let component

  beforeEach(() => {
    component = render(
      <Togglable buttonLabel="show...">
        <div className="testDiv" />
      </Togglable>
    )
  })

  test('renders its children', () => {
    expect(
      component.container.querySelector('.testDiv')
    ).toBeDefined()
  })

  test('at start the children are not displayed', () => {
    const div = component.container.querySelector('.blog-full')

    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', () => {
    const button = component.getByText('show...')
    fireEvent.click(button)

    const div = component.container.querySelector('.blog-full')
    expect(div).not.toHaveStyle('display: none')
  })

  test('toggled content can be closed', () => {
    const button = component.getByText('show...')
    fireEvent.click(button)

    const closeButton = component.getByText('cancel')
    fireEvent.click(closeButton)

    const div = component.container.querySelector('.blog-full')
    console.log(prettyDOM(div))
    expect(div).toHaveStyle('display: none')
  })

  test('<BlogForm /> updates parent state and calls onSubmit', () => {
    const createBlog = jest.fn()

    const component = render(
      <BlogForm createBlog={createBlog} />
    )

    const input = component.container.querySelector('#title')
    const form = component.container.querySelector('form')

    fireEvent.change(input, {
      target: { value: 'testing of forms could be easier' }
    })
    fireEvent.submit(form)
    //console.log(createBlog.mock.calls)
    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('testing of forms could be easier' )
  })

  test('5.13', () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      likes: 20
    }
    let component = render(
      <Blog blog={blog}/>
    )
    const div = component.container.querySelector('.blog-preview')
    console.log(prettyDOM(div))
    expect(div).toHaveTextContent('Title', 'Likes')
    expect(div).not.toHaveTextContent('Content')
  })

  test('5.14', () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      likes: 20,
      author: 'soma-kun',
      content: 'shokugeki no somaaaa',
    }

    let component = render(
      <Blog blog={blog} />
    )

    const buttonMore = component.getByText('More')
    fireEvent.click(buttonMore)

    const div = component.container.querySelector('.blog-full')

    expect(div).not.toHaveStyle('display: none')
    console.log(prettyDOM(div))
  })

  test('5.15', () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      likes: 20
    }

    const updateBlog = jest.fn()

    let component = render(
      <Blog blog={blog} updateBlog={updateBlog} />
    )

    const likeButton = component.getByText('Like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(updateBlog.mock.calls).toHaveLength(2)
  })
})