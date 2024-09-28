import React from 'react'
import styled from 'styled-components'

const ButtonStyle = styled.button`
  background-color: blue;
  color: white;
  border: none;
  padding: 15px 32px;
`  

interface ButtonProps {
  children?: React.ReactNode
  type?: string;
}

const Button: React.FC<ButtonProps> = ({ children }) => (
  <ButtonStyle></ButtonStyle>)
export default Button
