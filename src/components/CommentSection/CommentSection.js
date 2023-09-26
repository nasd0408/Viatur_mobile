import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import axios from 'axios';
import { Avatar, Card, Button, Title, Paragraph, ActivityIndicator, TextInput, Text } from 'react-native-paper';
import { API_BASE_URL } from '../../utils/dev';
import colors from '../../utils/ColorScheme';
import { AirbnbRating, Rating } from 'react-native-ratings';

const CommentSection = ({ EntidadId, TipoEntidad }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [rating, setRating] = useState(0);
  function formatDateToDDMMYYYY(inputDate) {
    const date = new Date(inputDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
  
    return `${day}-${month}-${year}`;
  }

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/resenas/${EntidadId}/${TipoEntidad}`);
        setComments(response.data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchComments();
  }, [EntidadId]);

  const handleCommentSubmit = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/resenas`, {
        comentario: commentText,
        puntaje: rating,
        EntidadId,
        TipoEntidad,
      });
      // Actualizar la lista de comentarios con el nuevo comentario
      setComments([...comments, response.data.data]);
      // Limpiar el texto del comentario y el puntaje después de enviar
      setCommentText('');
      setRating(0);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Comentarios</Title>

      {/* Formulario de comentario */}
      <TextInput
        style={styles.commentInput}
        placeholder="Escribe tu comentario..."
        value={commentText}
        onChangeText={(text) => setCommentText(text)}
      />
      <AirbnbRating
        selectedColor={colors.Verdigris}
        onFinishRating={rating=> setRating(rating)}
        reviews={[
          "Malo",
          "Regular",
          "Bueno",
          "Muy bueno",
          "Excelente"
        ]}
        reviewColor={colors.Primary}
        reviewSize={20}
        
      />
      <Button
        onPress={handleCommentSubmit}
        mode='contained'
        icon='comment'
        style={{marginTop:10}}
      >
        Enviar comentario
      </Button >

      {comments.length === 0 ? (
        <Text style={styles.noCommentsText}>No hay comentarios disponibles.</Text>
      ) : (
        comments.map((comment) => (
          <Card key={comment.creado} style={styles.card}>
            <Card.Title
              title={comment.persona.nombres + " " + comment.persona.apellidos}
              subtitle={formatDateToDDMMYYYY(comment.creado)}
              left={(props) => <Avatar.Image source={{ uri: `${API_BASE_URL}/persona/${comment.persona.id}/foto-perfil` }} {...props} />}
            />
            <View style={styles.starContainer}>
              <AirbnbRating
                defaultRating={comment.puntaje}
                isDisabled={true}
                selectedColor={colors.Verdigris}
                showRating={false}
                size={30}
              />
            </View>
            <Card.Content>
              <Paragraph>{comment.comentario}</Paragraph>
            </Card.Content>
          </Card>
        ))
      )}
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
    marginVertical: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentInput: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  starContainer: {
    marginHorizontal: 50,
    alignContent: "flex-start",
    flexDirection: "row"
  },
  noCommentsText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: 'gray',
  },
});

export default CommentSection;
