import React from 'react'

const Cheat = () => {
    const items = [{
        id: 1,
        category: "cat_1",
        title: "My title 1"
    }, {
        id: 2,
        category: "cat_2",
        title: "My title 2"
    }, {
        id: 6,
        category: "cat_1",
        title: "Another title 1"
    }, {
        id: 1,
        category: "cat_3",
        title: "My title 3"
    }, {
        id: 8,
        category: "cat_1",
        title: "Third Title"
    }, {
        id: 2,
        category: "cat_2",
        title: "Another title 2 "
    }];
    const cats = items.reduce((catsSoFar: any, { category, title }) => {
        if (!catsSoFar[category]) catsSoFar[category] = [];
        catsSoFar[category].push(title);
        return catsSoFar;
    }, {});
    console.log(cats);
  return (
    <div>Cheat</div>
  )
}

export default Cheat