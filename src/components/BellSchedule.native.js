// @flow

import * as React from 'react';

import { Text, View, StyleSheet } from 'react-native';
import { COLOR } from 'react-native-material-ui';
import { Card } from 'react-native-material-ui';

export type Period = {
  period: string,
  time: string
};

type Props = {
  loading: boolean,
  periods: Period[],
  scheduleName: string
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.grey100
  },
  card: {},
  columnsContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  column: {
    flex: 1,
    flexDirection: 'column'
  },
  row: {
    height: 48,
    borderBottomColor: 'rgba(0,0,0,0.12)',
    borderBottomWidth: 1,
    justifyContent: 'center',
    paddingHorizontal: 32
  },
  numericRow: {
    textAlign: 'right'
  },
  headingRow: {
    height: 56
  },
  heading: {
    fontWeight: '500',
    color: 'rgba(0,0,0,0.54)'
  },
  scheduleName: {
    fontSize: 21,
    fontWeight: '500',
    textAlign: 'center',
    paddingTop: 24
  }
});

const Column = ({ children, ...props }) =>
  <View style={styles.column} {...props}>
    {children}
  </View>;

const HeadingRow = props =>
  <Row style={styles.headingRow} textStyle={styles.heading} {...props} />;

const Row = ({ style, ...props }: { style?: any }) =>
  <View style={[styles.row, style]} {...props}>
    <Text style={[props.numeric && styles.numericRow, props.textStyle]}>
      {props.children}
    </Text>
  </View>;

const BellSchedule = ({ periods, loading, scheduleName }: Props) => {
  const cardStyle = {
    container: [styles.card, { height: periods.length * 48 + 116 }]
  };
  return (
    <View className="bell-schedule" style={styles.container}>
      <Card style={cardStyle}>
        {scheduleName !== 'none' &&
          <View>
            <Text style={styles.scheduleName}>
              {scheduleName}
            </Text>
          </View>}

        <View style={styles.columnsContainer}>
          {/*Period column*/}
          <Column>
            <HeadingRow numeric={true}>Period</HeadingRow>
            {periods.map(n => {
              return (
                <Row key={n.period} numeric={true}>
                  {n.period}
                </Row>
              );
            })}
          </Column>

          {/*Time column*/}
          <Column>
            <HeadingRow>Time</HeadingRow>
            {periods.map(n => {
              return (
                <Row key={n.period}>
                  {n.time}
                </Row>
              );
            })}
          </Column>
        </View>
      </Card>
    </View>
  );
};

export default BellSchedule;
