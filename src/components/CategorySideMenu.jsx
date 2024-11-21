import React from 'react'
import { loadAllCategories } from "../services/category-service";
import { useEffect, useState, useRef } from "react";
import { Card, CardBody, Input, Form, Label, Container, Button,ListGroup, ListGroupItem } from "reactstrap";

function CategorySideMenu() {

  const [categories, setCategories] = useState([]);
    // Load categories and user information
  useEffect(() => {
    loadAllCategories()
      .then((data) => {
        setCategories([...data]);
      })
      .catch((error) => {
        console.log(error);
        
      });
  }, []);

  return (
    <div>
       <ListGroup>
        {/* action="true" means clickable */}
          <ListGroupItem action={true} className='border-0'>
                  All Blogs
          </ListGroupItem>


         {categories && categories.map((category)=>{
            return(
                <ListGroupItem className='border-0'  action={true}  value={category.Id} key={category.Id}>
                     {category.CategoryName}
                </ListGroupItem>
            )

        
          })} 

       </ListGroup>
       
    </div>
  )
}

export default CategorySideMenu
