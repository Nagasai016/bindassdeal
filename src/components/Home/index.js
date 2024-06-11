import {Component} from 'react'
import Cookies from 'js-cookie'
import Item from '../Item'
import './index.css'

const tasks = [
  {
    id: 1,
    name: 'Complete Project Report',
    description:
      'Write and finalize the project report for the first quarter. Ensure all sections are complete and proofread.',
  },
  {
    id: 2,
    name: 'Team Meeting',
    description:
      'Conduct the weekly team meeting to discuss project progress, challenges, and next steps.',
  },
  {
    id: 3,
    name: 'Client Follow-Up',
    description:
      'Follow up with the client regarding the recent proposal and address any questions or concerns they may have.',
  },
  {
    id: 4,
    name: 'Daily Standup',
    description:
      'Participate in the daily standup meeting to provide updates on current tasks and coordinate with the team.',
  },
  {
    id: 5,
    name: 'Check Emails',
    description:
      'Go through the inbox and respond to all important emails. Organize the emails into appropriate folders.',
  },
  {
    id: 6,
    name: 'Workout Session',
    description:
      'Attend the morning workout session to stay fit and healthy. Focus on cardio and strength training exercises.',
  },
  {
    id: 7,
    name: 'Lunch Break',
    description:
      'Take a break for lunch. Ensure to eat a balanced and nutritious meal.',
  },
  {
    id: 8,
    name: 'Code Debugging',
    description:
      'Debug the code for the new feature being developed. Identify and fix any bugs or issues.',
  },
  {
    id: 9,
    name: 'Prepare Presentation',
    description:
      'Prepare the slides for the upcoming presentation. Include key points and visual aids to enhance the presentation.',
  },
  {
    id: 10,
    name: 'Attend Webinar',
    description:
      'Attend the scheduled webinar to learn about the latest industry trends and best practices.',
  },
  {
    id: 11,
    name: 'Review Documents',
    description:
      'Review the project documents and ensure all the necessary information is accurate and up-to-date.',
  },
  {
    id: 12,
    name: 'Grocery Shopping',
    description:
      'Go to the grocery store to buy essentials for the week. Make sure to stick to the shopping list.',
  },
  {
    id: 13,
    name: 'Evening Walk',
    description:
      'Take a 30-minute walk in the evening to relax and clear the mind.',
  },
  {
    id: 14,
    name: 'Read a Book',
    description:
      'Spend some time reading a book for personal development or leisure.',
  },
  {
    id: 15,
    name: 'Plan Next Day',
    description:
      'Plan the tasks and schedule for the next day. Prioritize important activities.',
  },
]

class Home extends Component {
  state = {items: tasks, newName: '', newDesc: '', searchInput: ''}

  componentDidMount() {
    if (localStorage.getItem('name') === null) {
      const {history} = this.props
      history.replace('/signup')
    }
    if (Cookies.get('jwtToken') === undefined) {
      const {history} = this.props
      history.replace('/login')
    }
  }

  changeName = event => {
    this.setState({
      newName: event.target.value,
    })
  }

  changeDesc = event => {
    this.setState({
      newDesc: event.target.value,
    })
  }

  addItem = () => {
    const {newName, newDesc} = this.state
    this.setState(prev => ({
      items: [
        ...prev.items,
        {id: prev.items.length + 1, name: newName, description: newDesc},
      ],
    }))
  }

  logout = () => {
    const {history} = this.props
    Cookies.remove('jwtToken')
    history.replace('/login')
  }

  search = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  deleteItem = id => {
    const {items} = this.state
    const itemsFiltered = items.filter(each => each.id !== id)
    this.setState({
      items: itemsFiltered,
    })
  }

  render() {
    const {items, searchInput} = this.state
    const filteredList = items.filter(task =>
      task.name.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return (
      <div className="home-container">
        <div className="align">
          <h1 className="home-title">HOME PAGE</h1>
          <button className="button-logout" onClick={this.logout}>
            Logout
          </button>
        </div>
        <input
          type="text"
          className="input-field"
          placeholder="Add Name For New Task"
          onChange={this.changeName}
        />
        <br />
        <input
          type="text"
          className="input-field"
          placeholder="Add Description"
          onChange={this.changeDesc}
        />
        <br />
        <button className="add-button" onClick={this.addItem} type="button">
          ADD TASK
        </button>

        <input
          type="search"
          className="input-field input-2"
          placeholder="Search"
          onChange={this.search}
        />
        <ul className="task-list">
          {filteredList.map(each => (
            <Item
              key={each.id}
              details={each}
              id={each.id}
              deleteItem={this.deleteItem}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default Home
