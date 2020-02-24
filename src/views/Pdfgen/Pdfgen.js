import React, { Component } from 'react'
import jsPDF from 'jspdf'
import PDF, { Text, AddPage, Line, Image, Table, Html } from 'jspdf-react'
 

export default class Pdfgen extends Component {
  render() {
    const properties = { title: 'Mit Title' }
    const columns = ["ID", "Name", "Country"]
    const rows = [
        [1, "Shaw", "Tanzania"],
        [2, "Nelson", "Kazakhstan"],
        [3, "Garcia", "Madagascar"],
    ]
    return (
        <React.Fragment>
        <PDF
          properties={properties}
          preview={true}
        >
          <Text x={35} y={25} size={40}>Octonyan loves jsPDF</Text>
        
          <AddPage />
          <Table
            columns={columns}
            rows={rows}
          />
          <AddPage format='a6' orientation='l' />
          <Text x={10} y={10} color='red'>Sample</Text>
          <Line x1={20} y1={20} x2={60} y2={20}/>
          <AddPage />
          
        </PDF>
       <button>Alm. react button</button>
      </React.Fragment>
    )
  }
}
