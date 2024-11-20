import React from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'

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
          {categories && categories.map}

       </ListGroup>
    </div>
  )
}

export default CategorySideMenu
