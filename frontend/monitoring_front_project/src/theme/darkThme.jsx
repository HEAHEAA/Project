export const themes = JSON.parse(localStorage.getItem('theme'));
export const darkMode = {
    color: 'white',

    err_modal: {
        backgroundColor:'#222738',
        borderRadius: 2,
        color: "white",
        boxShadow: 24,
        p: 4,
    },
    side_Bar: {
        app_header: '#2f3243',
    },
    drawer_menu: {
        menu: '#282c38',
        drawer_bar: '#282c38',
    },
    dashboard_bg: {
        backgroundColor: '#282c38',
    },
    dashboard_inner: {
        backgroundColor: '#282c38',
    },
    map_header: {
        backgroundColor: '#242533'
    },
    dash_table_head: {
        backgroundColor: '#1f212d',
    },
    dash_table_body: {
        backgroundColor: '#2f3243'
    },
    dash_chart_bg: {
        backgroundColor: '#2f3243'
    },
    chart_color: {
        color: 'black'
    },
    map_menu: {
        width: '100%',
        maxWidth: 200,
        backgroundColor: "#2a2d44",
        float: 'right',
        zIndex: 1,
        marginTop: 1,
        marginLeft: 1,
        color: 'white',
        borderRadius: 1
    },
    real_layout_h1: {
        color: "white"
    },
    real_layout_input: {
        backgroundColor: '#2f3243',
        color: "white"
    },

}
