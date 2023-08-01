import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import ThemeContext from '../../ThemeContext';
import DarkTheme from '../../DarkTheme';
import LightTheme from '../../LightTheme';
import { Chart, Line, Area, HorizontalAxis, VerticalAxis } from 'react-native-responsive-linechart'






const DohodkiGraf = ({navigation}) => {
    const { isDarkTheme } = useContext(ThemeContext);
    const theme = isDarkTheme ? DarkTheme : LightTheme;
    const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}];
    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor}]}>
            <Text style={[styles.text, { color: theme.textColor }]} >Graf Dohodkov</Text>
            <Chart
                style={{ height: 200, width: 400 }}
                data={[
                    { x: -2, y: 15 },
                    { x: -1, y: 10 },
                    { x: 0, y: 12 },
                    { x: 1, y: 7 },
                    { x: 2, y: 6 },
                    { x: 3, y: 8 },
                    { x: 4, y: 10 },
                    { x: 5, y: 8 },
                    { x: 6, y: 12 },
                    { x: 7, y: 14 },
                    { x: 8, y: 12 },
                    { x: 9, y: 13.5 },
                    { x: 10, y: 18 },
                ]}
                padding={{ left: 40, bottom: 20, right: 20, top: 20 }}
                xDomain={{ min: -2, max: 10 }}
                yDomain={{ min: 0, max: 20 }}
                >
                <VerticalAxis tickCount={11} theme={{ labels: { formatter: (v) => v.toFixed(2) } }} />
                <HorizontalAxis tickCount={5} />
                <Area theme={{ gradient: { from: { color: '#ffa502' }, to: { color: '#ffa502', opacity: 0.4 } }}} />
                <Line theme={{ stroke: { color: '#ffa502', width: 5 }, scatter: { default: { width: 4, height: 4, rx: 2 }} }} />
            </Chart>
        </View>
    )
}

export default DohodkiGraf

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text:{
        paddingTop: 10,
        paddingLeft: 5,
    },
})