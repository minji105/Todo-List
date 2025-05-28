import { useState } from "react";
import styled from "styled-components";

const QuoteContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 24px 40px;
  border-radius: 12px;
  text-align: center;
  background-color: #f7f7f7e2;

  p {
    line-height: 1.5rem;
    margin-bottom: 8px;
    &:first-child {
      font-size: 1.2rem;
    }
  }
`

const quotes = [
  {text:  'Only I can change my life, no one can do it for me.', author: 'Carol Burnett'},
  {text:  'Great minds have purposes, others have wishes.', author: 'Washington Irving'},
  {text:  'Don’t be afraid to give up the good to go for the great.', author: 'John D. Rockefeller'},
  {text:  'I didn’t get there by wishing for it or hoping for it, but by working for it.', author: 'Estée Lauder'},
  {text:  'Tough times never last, but tough people do.', author: 'Robert H. Schuller'},
]

function Quote() {
  const getRandomQuote = () => quotes[Math.floor(Math.random() * quotes.length)];
  const [quote, _] = useState(getRandomQuote);

  return (
    <QuoteContainer>
      <p>{quote.text}</p>
      <p>- {quote.author}</p>
    </QuoteContainer>
  );
}

export default Quote;