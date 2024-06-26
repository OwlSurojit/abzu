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

![](https://i.ibb.co/0rcG5nT/Screenshot-2024-06-27-at-18-10-21.png)

### Your own coverage tool

#### Christian Ledgard

`selectKeyValuesDataSource` & `rolesReducer`

[Commit to the instrumented code to gather coverage measurement.](https://github.com/OwlSurojit/abzu/pull/5/commits/910c9d9072be2593a75f2cd7a588795a05d9b2fb)

![](https://i.ibb.co/qrQMMLz/Snackbar-Selectors-Unit-Tests.png)

#### Emilis Masalskis

`getMarkersForMap`

[Commit to the instrumented code to gather coverage measurement.](https://github.com/OwlSurojit/abzu/pull/6/commits/967fb599975fb30aa5e987051ade23cdaa018d15)

`getProperZoomLevel`

[Commit to the instrumented code to gather coverage measurement.](https://github.com/OwlSurojit/abzu/pull/6/commits/2e64166098939350bacd2a8b6536ece1746eede9)

![](https://i.ibb.co/vBRF6Gm/343811831-60d1fa9b-3121-403f-a0db-9f2dc2f486e6.png)

#### Adrian Müller

`getEnvColor` & `extractCoordinates`

[Commit to the instrumented code to gather coverage measurement.](https://github.com/OwlSurojit/abzu/pull/3/commits/f9d8bdb38116e3ac2a34a8c9af27378b09f3e6ce)

![](https://i.ibb.co/cJvHrDr/Screenshot-2024-06-27-at-16-43-09.png)

#### Zoja Gobec

`shouldMutateParking` & `reportReducer`

[Commit to the instrumented code to gather coverage measurement.](https://github.com/OwlSurojit/abzu/pull/4/commits/04a542085a357379f7eddbec505521a0592765ca)

![](https://i.ibb.co/dm6BFr0/Screenshot-2024-06-27-at-16-42-07.png)

## Coverage improvement

### Individual tests

#### Christian Ledgard

`selectKeyValuesDataSource` & `rolesReducer`

[New tests commit](https://github.com/OwlSurojit/abzu/pull/5/commits/59a6e04f68ac5f970d3785a4acd70279973ddbd7)

before:
![](https://i.ibb.co/DW9m7gG/before-christian.png)

after:
![](https://i.ibb.co/qrQMMLz/Snackbar-Selectors-Unit-Tests.png)

We improve the coverage from 0% to 100% in the `selectKeyValuesDataSource` and from 66.66% to 100% in the `rolesReducer` function. The different branches were analyzed and we were able to add new tests to coverage missing paths.

#### Emilis Masalskis

`getMarkersForMap`

[New tests commit](https://github.com/OwlSurojit/abzu/pull/6/commits/e2f10852939b380a994596db6f765960019bdd89)

before:
![](https://i.ibb.co/X5zcspJ/Screenshot-2024-06-27-at-17-01-44.png)

after:
![](https://i.ibb.co/K2CB15b/Screenshot-2024-06-27-at-17-44-46.png)

`getProperZoomLevel`

[New tests commit](https://github.com/OwlSurojit/abzu/pull/6/commits/2e64166098939350bacd2a8b6536ece1746eede9)

before:
![](https://i.ibb.co/68rGQJ6/Screenshot-2024-06-27-at-17-04-19.png)

after:
![](https://i.ibb.co/8K6jGnS/Screenshot-2024-06-27-at-17-46-08.png)

We improve the coverage from 0% to 100% in the `getMarkersForMap` and from 43.63% to 48.33% in the `getProperZoomLevel` function. The different branches were analyzed and we were able to add new tests to coverage missing paths.

#### Adrian Müller

`getEnvColor`

[New tests commit](https://github.com/OwlSurojit/abzu/pull/3/commits/f9d8bdb38116e3ac2a34a8c9af27378b09f3e6ce)

before:
![](https://i.ibb.co/st5qqVB/Screenshot-2024-06-27-at-17-11-41.png)

after:
![](https://i.ibb.co/gPyqdJR/Screenshot-2024-06-27-at-17-46-55.png)

`extractCoordinates`

[New tests commit](https://github.com/OwlSurojit/abzu/pull/3/commits/f9d8bdb38116e3ac2a34a8c9af27378b09f3e6ce)

before:
![](https://i.ibb.co/4K5X5NP/Screenshot-2024-06-27-at-17-12-08.png)

after:
![](https://i.ibb.co/D1F6qqm/Screenshot-2024-06-27-at-17-47-12.png)

We improve the coverage from 0% to 100% in the `getEnvColor` and from 78.88% to 81.25% in the `extractCoordinates` function. The different branches were analyzed and we were able to add new tests to coverage missing paths.

#### Zoja Gobec

`shouldMutateParking`

[New tests commit](https://github.com/OwlSurojit/abzu/pull/4/commits/04a542085a357379f7eddbec505521a0592765ca)

before:
![](https://i.ibb.co/K5FxPsW/Screenshot-2024-06-27-at-17-09-13.png)

after:
![](https://i.ibb.co/4tn7jd8/Screenshot-2024-06-27-at-17-43-25.png)

`reportReducer`

[New tests commit](https://github.com/OwlSurojit/abzu/pull/4/commits/04a542085a357379f7eddbec505521a0592765ca)

before:
![](https://i.ibb.co/s5fds8x/Screenshot-2024-06-27-at-17-10-15.png)

after:
![](https://i.ibb.co/xsnqHPr/Screenshot-2024-06-27-at-17-43-52.png)

We improve the coverage from 0% to 46.66% in the `shouldMutateParking` and from 0% to 92.59% in the `reportReducer` function. The different branches were analyzed and we were able to add new tests to coverage missing paths.

### Overall

![](https://i.ibb.co/0rcG5nT/Screenshot-2024-06-27-at-18-10-21.png)

![](https://i.ibb.co/wQNm8v4/Screenshot-2024-06-27-at-18-07-02.png)

## Statement of individual contributions

- Adrian Müller (@OwlSurojit): [getEnvColor and extractCoordinates](https://github.com/OwlSurojit/abzu/pull/3)
- Christian Ledgard (@christianledgard): [selectKeyValuesDataSource and rolesReducer](https://github.com/OwlSurojit/abzu/pull/5)
- Emilis Masalskis (@EMasalskis): [getMarkersForMap and getProperZoomLevel](https://github.com/OwlSurojit/abzu/pull/6)
- Zoja Gobec (@zjgb): [shouldMutateParking and reportReducer Unit Tests](https://github.com/OwlSurojit/abzu/pull/4)
