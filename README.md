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

[Commit to the instrumented code to gather coverage measurement.](https://github.com/OwlSurojit/abzu/pull/5/commits/910c9d9072be2593a75f2cd7a588795a05d9b2fb)

![](https://i.ibb.co/qrQMMLz/Snackbar-Selectors-Unit-Tests.png)

#### Emilis Masalskis

`getMarkersForMap`

[Commit to the instrumented code to gather coverage measurement.](https://github.com/OwlSurojit/abzu/pull/6/commits/967fb599975fb30aa5e987051ade23cdaa018d15)

`getProperZoomLevel`

[Commit to the instrumented code to gather coverage measurement.](https://github.com/OwlSurojit/abzu/pull/6/commits/2e64166098939350bacd2a8b6536ece1746eede9)

![](https://private-user-images.githubusercontent.com/122734286/343811831-60d1fa9b-3121-403f-a0db-9f2dc2f486e6.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTk0OTg3MTQsIm5iZiI6MTcxOTQ5ODQxNCwicGF0aCI6Ii8xMjI3MzQyODYvMzQzODExODMxLTYwZDFmYTliLTMxMjEtNDAzZi1hMGRiLTlmMmRjMmY0ODZlNi5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQwNjI3JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDYyN1QxNDI2NTRaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0yNjgxMDBlZmUxZjFmMDVjNjE0YjY3OTc2ODU1MTE2MDgzMmIwMTk1NjhlMzYxNTZkNmM2NDJjYzA3NWZiZTFmJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZhY3Rvcl9pZD0wJmtleV9pZD0wJnJlcG9faWQ9MCJ9.LB14tZOvgRmBegbEtplBCdWjuJYAZDPWQCmB5AGt1_A)

#### Adrian Müller

`getEnvColor` & `extractCoordinates`

[Commit to the instrumented code to gather coverage measurement.](https://github.com/OwlSurojit/abzu/pull/3/commits/f9d8bdb38116e3ac2a34a8c9af27378b09f3e6ce)

![](https://ibb.co/p2P8LJL)

#### Zoja Gobec

`shouldMutateParking` & `reportReducer`

[Commit to the instrumented code to gather coverage measurement.](https://github.com/OwlSurojit/abzu/pull/4/commits/04a542085a357379f7eddbec505521a0592765ca)

![](https://ibb.co/fDtMf2Y)

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
- Emilis Masalskis (@EMasalskis): [getMarkersForMap and getProperZoomLevel](https://github.com/OwlSurojit/abzu/pull/6)
- Zoja Gobec (@zjgb): [shouldMutateParking and reportReducer Unit Tests](https://github.com/OwlSurojit/abzu/pull/4)
