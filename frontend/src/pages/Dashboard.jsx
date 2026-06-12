import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [leads, setLeads] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [source, setSource] = useState("");
  const [notes, setNotes] = useState("");

  const fetchLeads = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/leads"
      );

      setLeads(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const addLead = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/leads",
        {
          name,
          email,
          source,
          notes,
        }
      );

      setName("");
      setEmail("");
      setSource("");
      setNotes("");

      fetchLeads();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteLead = async (id) => {
    await axios.delete(
      `http://localhost:5000/api/leads/${id}`
    );

    fetchLeads();
  };

  const updateStatus = async (id, status) => {
    await axios.put(
      `http://localhost:5000/api/leads/${id}`,
      { status }
    );

    fetchLeads();
  };

  return (
    <div className="dashboard-container">

      <h1 className="title">
        Client Lead Management System
      </h1>

      <div className="stats">

        <div className="card-box">
          <h4>Total Leads</h4>
          <h2>{leads.length}</h2>
        </div>

        <div className="card-box">
          <h4>New</h4>
          <h2>
            {
              leads.filter(
                (l) => l.status === "New"
              ).length
            }
          </h2>
        </div>

        <div className="card-box">
          <h4>Contacted</h4>
          <h2>
            {
              leads.filter(
                (l) =>
                  l.status === "Contacted"
              ).length
            }
          </h2>
        </div>

        <div className="card-box">
          <h4>Converted</h4>
          <h2>
            {
              leads.filter(
                (l) =>
                  l.status === "Converted"
              ).length
            }
          </h2>
        </div>

      </div>

      <div className="form-card">

        <h2>Add Lead</h2>

        <input
          placeholder="Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          placeholder="Source"
          value={source}
          onChange={(e) =>
            setSource(e.target.value)
          }
        />

        <textarea
          placeholder="Notes"
          value={notes}
          onChange={(e) =>
            setNotes(e.target.value)
          }
        />

        <button
          className="btn-add"
          onClick={addLead}
        >
          Add Lead
        </button>

      </div>

      <div className="table-container">

        <table>

          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Source</th>
              <th>Status</th>
              <th>Notes</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {leads.map((lead) => (
              <tr key={lead._id}>
                <td>{lead.name}</td>
                <td>{lead.email}</td>
                <td>{lead.source}</td>

                <td>
                  <select
                    value={lead.status}
                    onChange={(e) =>
                      updateStatus(
                        lead._id,
                        e.target.value
                      )
                    }
                  >
                    <option>New</option>
                    <option>Contacted</option>
                    <option>Converted</option>
                  </select>
                </td>

                <td>{lead.notes}</td>

                <td>
                  <button
                    className="delete-btn"
                    onClick={() =>
                      deleteLead(lead._id)
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}
