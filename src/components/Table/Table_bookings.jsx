import React, { Component } from 'react';
import { Button, Typography, Box, IconButton, TextField } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

class TableBookings extends Component {
  constructor(props) {
    super(props);
    this.state = { tables: [], updates: [], updateText: "" };
  }

  componentDidMount() {
    this.fetchTables();
  }

  fetchTables = () => {
    fetch("https://renderhm.onrender.com/api/tables/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response error");
        }
        return response.json();
      })
      .then((data) => {
        const updateFields = data.map(() => ({ field: false, button: false }));
        this.setState({ tables: data, updates: updateFields });
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };

  handleUpdateClick = (index) => {
    const { updates } = this.state;
    const updatedFields = updates.map((item, idx) =>
      idx === index ? { ...item, field: true, button: true } : item
    );
    this.setState({ updates: updatedFields });
  };

  handleSubmit = (id, index) => {
    const { updateText, tables,updates } = this.state;
    if (!updateText.trim()) {
      console.error("Update text is empty");
      return;
    }
    fetch(`https://renderhm.onrender.com/api/tables/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ number: updateText }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response error");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Update successful:", data);
        const updatedTables = tables.map((table, idx) =>
          idx === index ? { ...table, number: updateText } : table
        );
        const resetUpdates = updates.map(() => ({ field: false, button: false }));
        this.setState({ tables: updatedTables, updates: resetUpdates, updateText: "" });
      })
      .catch((error) => {
        console.error("Update error:", error);
      });
  };

  render() {
    const { tables, updates } = this.state;

    return (
      <div
        style={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "10px",
          marginTop: "3rem",
          placeItems: "center",
        }}
      >
        {tables.map((item, index) => (
          <div
            key={item.id}
            style={{
              fontSize: "28px",
              color: "white",
              padding: "10px",
              width: "200px",
              backgroundColor: "black",
              border: "2px solid black",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <img
              src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/274925427.jpg?k=c580ed088d04ea5706114e19e05b52df194b97b778197bfd797fe0e955776996&o=&hp=1"
              alt="Placeholder"
              style={{
                width: "100%",
                height: "100px",
                borderRadius: "5px",
              }}
            />
            <Box sx={{ width: "100%", height: "50%", backgroundColor: "pink" }}>
              {updates[index].field ? (
                <TextField
                  type="number"
                  onChange={(e) => this.setState({ updateText: e.target.value })}
                  placeholder="Enter table number"
                  InputProps={{
                    style: {
                      height: '2rem',
                      backgroundColor: '#CCD1D1',
                    },
                  }}
                />
              ) : (
                <Typography variant="body1">{item.number}</Typography>
              )}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "1.5rem",
                  backgroundColor: "white",
                }}
              >
                <Button
                  onClick={() => this.handleUpdateClick(index)}
                  size="small"
                  variant="contained"
                  color="primary"
                  sx={{
                    backgroundColor: 'black',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#303f9f',
                    },
                  }}
                >
                  {updates[index].button ? (
                    <button onClick={() => this.handleSubmit(item.id, index)}>Submit</button>
                  ) : (
                    "Update"
                  )}
                </Button>
                <IconButton
                  size="large"
                  edge="start"
                  sx={{ color: "red" }}
                  aria-label="cancel"
                >
                  <CancelIcon />
                </IconButton>
              </Box>
            </Box>
          </div>
        ))}
      </div>
    );
  }
}

export default TableBookings;
