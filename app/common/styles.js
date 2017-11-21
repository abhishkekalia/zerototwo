import {StyleSheet} from 'react-native';
const HEADER_HEIGHT = 64;

export default StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: HEADER_HEIGHT + 150
	},
	content: {
		flex: 1,
		padding: 30
	},
	iconusername : {
    	flexDirection: 'row', 
    	borderBottomWidth: 1,
		borderColor: 'red',
    },

	iconpassword : {
    	flexDirection: 'row',
    },

	inputcontent : { 
		borderColor: 'red',
		borderWidth: 1,
		borderStyle: 'solid',
		borderRadius: 5,
		bottom : 10
	},
	inputusername: {
		flex: 1,
    	paddingTop: 10,
    	paddingRight: 10,
    	paddingBottom: 10,
    	paddingLeft: 0,
    	backgroundColor: '#fff',
    	color: '#424242',
    },
	inputpassword: {
		flex: 1,
    	paddingTop: 10,
    	paddingRight: 10,
    	paddingBottom: 10,
    	paddingLeft: 0,
    	backgroundColor: '#fff',
    	color: '#424242',
	},

	label: {
		color: 'orange',
		padding: 5,
		fontSize: 18,
		fontWeight: "700",
		fontStyle: 'italic'
	},
	errorText: {
		backgroundColor: 'red',
		color: 'white',
		padding: 5,
		fontWeight: "700",
		fontStyle: 'italic'
	}
});