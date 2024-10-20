import React from 'react';
import { Container, Typography, Box, Card, CardContent, Avatar, Grid } from '@mui/material';
import { Email, Phone, LinkedIn, GitHub } from '@mui/icons-material';

const Contact = () => {
  return (
    <Container maxWidth="sm" style={{ marginTop: '4rem', textAlign: 'center' }}>
      <Avatar
        src="https://i.imgur.com/kR0SG0b.jpeg" // Replace with your image URL
        alt="yatish"
        sx={{ width:320, height: 320, margin: '0 auto 1rem' }}
        className='profile-image'
      />
      <Typography variant="h4" gutterBottom>
        Yatish Agrawal
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        Software Developer | Tech Enthusiast | Avid Reader
      </Typography>
      <Box my={4}>
  <Card>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        Contact Information
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid item container alignItems="center" spacing={1}>
          <Grid item>
            <Email color="primary" />
          </Grid>
          <Grid item>
            <Typography
              variant="body1"
              component="a"
              href="mailto:f20180660P@alumni.bits-pilani.ac.in"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              f20180660P@alumni.bits-pilani.ac.in
            </Typography>
          </Grid>
        </Grid>
        <Grid item container alignItems="center" spacing={1}>
          <Grid item>
            <Phone color="primary" />
          </Grid>
          <Grid item>
            <Typography
              variant="body1"
              component="a"
              href="tel:+917014348617"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              +91 7014348617
            </Typography>
          </Grid>
        </Grid>
        <Grid item container alignItems="center" spacing={1}>
          <Grid item>
            <LinkedIn color="primary" />
          </Grid>
          <Grid item>
            <Typography
              variant="body1"
              component="a"
              href="https://www.linkedin.com/in/yatish-agrawal-b93700178/"
              target="_blank"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              LinkedIn
            </Typography>
          </Grid>
        </Grid>
        <Grid item container alignItems="center" spacing={1}>
          <Grid item>
            <GitHub color="primary" />
          </Grid>
          <Grid item>
            <Typography
              variant="body1"
              component="a"
              href="https://github.com/ryu-yatish?tab=repositories"
              target="_blank"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              GitHub
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
</Box>


    </Container>
  );
};

export default Contact;
