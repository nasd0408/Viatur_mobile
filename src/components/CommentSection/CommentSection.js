import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';

const CommentSection = ({ siteId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`https://62918ba8cd0c91932b646bdc.mockapi.io/api/v1/Sitio/${siteId}/Reviews`);
        setComments(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchComments();
  }, [siteId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comentarios</Text>
      {comments.map((comment) => (
        <Card key={comment.createdAt} style={styles.card}>
          <Card.Title
            title={comment.name}
            subtitle={`Rating: ${comment.rating}`}
            left={(props) => <Avatar.Image source={{ uri: comment.avatar }} {...props} />}
          />
          <Card.Content>
            <Paragraph>{comment.comment}</Paragraph>
          </Card.Content>
        </Card>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  card: {
    marginBottom: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CommentSection;
