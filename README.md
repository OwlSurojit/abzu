# Report for Assignment 1

## Project chosen

Name: **abzu**

URL: https://github.com/entur/abzu

Number of lines of code and the tool used to count it: [38 KLOC](https://github.com/OwlSurojit/abzu/pull/3), as measured by sonarcloud

Programming language: JavaScript

## Coverage measurement

### Existing tool

<!-- Inform the name of the existing tool that was executed and how it was executed -->
The repository is using *react-scripts* which is internally calling **Jest** for reporting coverage and test results. We can execute it the following way:
```batch
npm run test -- --coverage
```

<Show the coverage results provided by the existing tool with a screenshot>

### Your own coverage tool

<The following is supposed to be repeated for each group member>

#### Christian Ledgard

`selectKeyValuesDataSource` & `rolesReducer`

<!-- Show a patch (diff) or a link to a commit made in your forked repository that shows the instrumented code to gather coverage measurements -->

[Commit to the instrumented code to gather coverage measurement.](https://github.com/OwlSurojit/abzu/pull/5/commits/910c9d9072be2593a75f2cd7a588795a05d9b2fb)

<!-- <Provide a screenshot of the coverage results output by the instrumentation> -->

![](https://i.ibb.co/qrQMMLz/Snackbar-Selectors-Unit-Tests.png)

<!-- <Function 2 name> -->

<!-- <Provide the same kind of information provided for Function 1> -->

## Coverage improvement

### Individual tests

<!-- <The following is supposed to be repeated for each group member> -->

#### Christian Ledgard

`selectKeyValuesDataSource` & `rolesReducer`

[New tests commit](https://github.com/OwlSurojit/abzu/pull/5/commits/59a6e04f68ac5f970d3785a4acd70279973ddbd7)


<!-- <Show a patch (diff) or a link to a commit made in your forked repository that shows the new/enhanced test> -->

<!-- <Provide a screenshot of the old coverage results (the same as you already showed above)> -->
before:
![](https://i.ibb.co/DW9m7gG/before-christian.png)

<!-- <Provide a screenshot of the new coverage results> -->
after:
![](https://i.ibb.co/qrQMMLz/Snackbar-Selectors-Unit-Tests.png)

<!-- <State the coverage improvement with a number and elaborate on why the coverage is improved> -->

We improve the coverage from 0% to 100% in the `selectKeyValuesDataSource` and from 66.66% to 100% in the `rolesReducer` function. The different branches were analyzed and we were able to add new tests to coverage missing paths.

<!-- <Provide the same kind of information provided for Test 1> -->

### Overall

<!-- <Provide a screenshot of the old coverage results by running an existing tool (the same as you already showed above)> -->

<!-- <Provide a screenshot of the new coverage results by running the existing tool using all test modifications made by the group> -->

## Statement of individual contributions

- Adrian Müller (@OwlSurojit): [getEnvColor and extractCoordinates](https://github.com/OwlSurojit/abzu/pull/3)
- Christian Ledgard (@christianledgard): [selectKeyValuesDataSource and rolesReducer](https://github.com/OwlSurojit/abzu/pull/5)
- Emilis Masalskis (@EMasalskis): 
- Zoja Gobec (@zjgb): [shouldMutateParking and reportReducer Unit Tests](https://github.com/OwlSurojit/abzu/pull/4)
