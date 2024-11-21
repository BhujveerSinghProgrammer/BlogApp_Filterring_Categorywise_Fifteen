import React, { useEffect, useState } from 'react'
import Base from '../components/Base'
import { useParams } from 'react-router-dom';
import { Col, Container, Row } from "reactstrap";
import CategorySideMenu from "../components/CategorySideMenu";
import { loadAllPostsByPageNumberandPageSizeAndCategoryId } from '../services/post-service';

function Categories() {
const{Id}=useParams();

 const [postContent, setPostContent] = useState({
    Contents: [],
    LastPage: 0,
    PageNumber: 1,  // Start at page 1 (1-based)
    PageSize: 10,   // Default page size
    TotalElements: 0,
    TotalPages: 0
  });

  const [currentPage, setCurrentPage] = useState(1);

  // Fetch paged posts when the page is first loaded or page changes
  useEffect(() => {
    changePage(currentPage);
  }, [currentPage]);

  // Handle page change
  const changePage = (pageNumber) => {
    // Skip if the page number exceeds TotalPages (unless TotalPages is 0 or undefined)
    //Note:- postContent.TotalPages is greater than 0 and "pageNumber" is greater than "postContent.TotalPages" then return the function,
    //Note:-if we want this "pageNumber > postContent.TotalPages" condition true and then return,then
    //we will use it with "postContent.TotalPages>0" condition becoz on initial load "TotalPages" will be zero.

    if (postContent.TotalPages > 0 && pageNumber > postContent.TotalPages) {
      return;
    }

    loadAllPostsByPageNumberandPageSizeAndCategoryId(pageNumber, postContent.PageSize,Id)
      .then((data) => {
        console.log('data to ram ji', data);
        // Only append posts that are not already in Contents to avoid duplicates
        setPostContent((prevState) => ({
          Contents: pageNumber === 1 ? data.Contents : [...prevState.Contents, ...data.Contents],
          //if page ===1 then use "data.Contents" directly else use "[...prevState.Contents, ...data.Contents]" to append with existing data.  
          LastPage: data.LastPage,
          PageNumber: data.PageNumber,
          PageSize: data.PageSize,
          TotalElements: data.TotalElements,
          TotalPages: data.TotalPages
        }));
      })
      .catch((error) => {
        toast.error('Error in loading posts pagewise');
      });
  };

  const changePageInfinite = () => {
    // Increment the current page to load the next page of content
    if (currentPage < postContent.TotalPages || postContent.TotalPages === 0) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };






  return (
   <Base>
    <Container className="mt-3">
    <Row>
         <Col md={2} className="pt-3"><CategorySideMenu/></Col>
         <Col md={10}></Col>
    </Row>
        {/* <NewFeed/> */}
   </Container>
   </Base>
  )
}

export default Categories
