import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';

const AdminPage = () => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
                const response = await axios.get('http://localhost:5000/admin/members');
                const membersWithImageURL = await Promise.all(response.data.map(async member => {
                    if (member.photo) {
                        const imageResponse = await axios.get(member.photo.image, { responseType: 'blob' });
                        const imageURL = URL.createObjectURL(imageResponse.data);
                        return { ...member, imageURL };
                    }
                    return { ...member, imageURL: null };
                }));
                setMembers(membersWithImageURL);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMembers();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <Header />
            <div className="p-6 bg-gray-100 min-h-screen">
                <h1 className="text-3xl font-bold mb-6">Admin Page</h1>
                <ul className="space-y-4">
                    {members.map(member => (
                        <li key={member.id} className="p-4 bg-white rounded shadow">
                            {member.imageURL && <img src={member.imageURL} alt={`${member.name}'s photo`} className="w-24 h-24 rounded-full mb-4" />}
                            <p className="text-lg font-semibold">{member.name}</p>
                            <p className="text-gray-600">{member.email}</p>
                            <p className="text-gray-600">Department No: {member.departmentNo}</p>
                            <p className="text-gray-600">Position: {member.position}</p>
                            <p className="text-gray-600">Status: {member.status}</p>
                            <p className="text-gray-600">Blood Group: {member.bloodGroup}</p>
                            <p className="text-gray-600">Address: {member.address?.flatNo}, {member.address?.street}, {member.address?.city}, {member.address?.pinCode}</p>
                            <p className="text-gray-600">Mobile: {member.address?.mobile}</p>
                            <p className="text-gray-600">Email: {member.address?.email}</p>
                            <p className="text-gray-600">Course Studied: PUC - {member.courseStudied?.puc}, UG - {member.courseStudied?.ug}, PG - {member.courseStudied?.pg}</p>
                            <p className="text-gray-600">Accomplishments: {member.accomplishments}</p>
                            <p className="text-gray-600">Honors Received: {member.honorsReceived}</p>
                            <p className="text-gray-600">Position Held: {member.positionHeld}</p>
                            <p className="text-gray-600">Memorable Events: {member.memorableEvents}</p>
                            <p className="text-gray-600">Relatives Studied: {member.relativesStudied}</p>
                            <p className="text-gray-600">Suggestions: {member.suggestions}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default AdminPage;