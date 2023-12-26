import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import NotesList from './components/NotesList';
import Search from './components/Search';
import Header from './components/Header';

const App = () => {
  const [notes, setNotes] = useState([
    {
      id: nanoid(),
      text: 'This is my first note!',
      date: '2021-04-15',
    },
    {
      id: nanoid(),
      text: 'This is my second note!',
      date: '2021-04-21',
    },
    {
      id: nanoid(),
      text: 'This is my third note!',
      date: '2021-04-28',
    },
    {
      id: nanoid(),
      text: 'This is my new note!',
      date: '2021-04-30',
    },
  ]);

  const [searchDate, setSearchDate] = useState();
 

	useEffect(() => {
		const savedNotes = JSON.parse(
			localStorage.getItem('react-notes-app-data')
		);

		if (savedNotes) {
			setNotes(savedNotes);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem(
			'react-notes-app-data',
			JSON.stringify(notes)
		);
	}, [notes]);

	const addNote = (text) => {
		const date = new Date();
		const newNote = {
			id: nanoid(),
			text: text,
			date: date.toLocaleDateString(),
		};
		const newNotes = [...notes, newNote];
		setNotes(newNotes);
	};

	const deleteNote = (id) => {
		const newNotes = notes.filter((note) => note.id !== id);
		setNotes(newNotes);
	};

	
	return (
		<div >
		  <div className='container'>
			<Header/>
	
			<Search handleSearchNote={setSearchDate} />
	
			<NotesList
			  notes={notes.filter((note) => {
				const formattedSearchDate = searchDate ? new Date(searchDate).toLocaleDateString() : '';
				const formattedNoteDate = new Date(note.date).toLocaleDateString();
				return formattedNoteDate.includes(formattedSearchDate);
			  })}
			  handleAddNote={addNote}
			  handleDeleteNote={deleteNote}
			/>
		  </div>
		</div>
	  );
	};
	
	export default App;
