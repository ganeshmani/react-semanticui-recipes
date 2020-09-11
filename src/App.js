import React, { useState, useEffect, Fragment } from "react";
import "./App.css";
import {
  Container,
  Input,
  Button,
  Dropdown,
  Loader,
  Dimmer,
  Card,
} from "semantic-ui-react";

import { useQuery } from "react-query";

import MealCard from "./components/MealCard";
import MealDetails from "./components/MealDetails";

function App() {
  const [currentCategory, setCurrentCategory] = useState(0);
  const [selectedMealId, setSelectedMealId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearch, setSearch] = useState(false);

  const { isLoading, error, data: categories } = useQuery(
    "categories",
    async () => {
      let result = await fetch(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      ).then((res) => res.json());
      result = result.categories.map((item) => {
        return {
          key: item.idCategory,
          text: item.strCategory,
          value: item.idCategory,
          image: item.strCategoryThumb,
        };
      });
      return result;
    }
  );

  const { data: meals } = useQuery(
    ["meals", currentCategory, categories],
    async (key, currentCategory, data) => {
      let result = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${data[currentCategory].text}`
      ).then((res) => res.json());

      return result.meals;
    },
    {
      enabled: categories,
    }
  );

  const { data: searchResults } = useQuery(
    ["searchMeals", isSearch, searchTerm],
    async (key, isSearch, searchTerm) => {
      if (isSearch) {
        let result = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
        ).then((res) => res.json());
        console.log("result", result);
        return result.meals;
      } else {
        return [];
      }
    }
  );

  const onSearch = () => {
    setSearch(true);
  };

  const onSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  if (isLoading)
    return (
      <Dimmer active inverted>
        <Loader inverted content="Loading" />
      </Dimmer>
    );
  return (
    <Container className="container" textAlign="center">
      {selectedMealId ? (
        <MealDetails
          mealId={selectedMealId}
          onBackButtonClick={() => setSelectedMealId(null)}
        />
      ) : (
        <Fragment>
          <div className="row">
            <Input
              className="search-input"
              size="large"
              value={searchTerm}
              onChange={onSearchChange}
              placeholder="Search Meal"
            />
            <Button onClick={onSearch} secondary>
              Search
            </Button>
            <Dropdown
              className="drop-down"
              placeholder="Filter Category"
              fluid
              search
              selection
              value={categories[currentCategory].value}
              onChange={(e, { value }) => {
                setCurrentCategory(value[0] - 1);
              }}
              options={categories}
            />
          </div>

          <Container className="container" textAlign="center">
            <Card.Group itemsPerRow={4}>
              {searchTerm && isSearch ? (
                searchResults &&
                searchResults.map((meal) => {
                  return (
                    <MealCard
                      title={meal.strMeal}
                      onClick={() => {
                        console.log("meal.idMeal", meal.idMeal);
                        setSelectedMealId(meal.idMeal);
                      }}
                      imageUrl={meal.strMealThumb}
                    />
                  );
                })
              ) : (
                <Fragment>
                  {meals &&
                    meals.map((meal) => {
                      return (
                        <MealCard
                          title={meal.strMeal}
                          onClick={() => {
                            console.log("meal.idMeal", meal.idMeal);
                            setSelectedMealId(meal.idMeal);
                          }}
                          imageUrl={meal.strMealThumb}
                        />
                      );
                    })}
                </Fragment>
              )}
            </Card.Group>
          </Container>
        </Fragment>
      )}
    </Container>
  );
}

export default App;
