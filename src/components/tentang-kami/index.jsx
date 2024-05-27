import React from 'react';
import { Box, Typography, Grid, Divider } from '@mui/material';

const TentangKami = () => {
    return (
        <Box mt={2}>
            <Grid item xs={12} container spacing={2}>
                <Box bgcolor={'primary.light'} p={2} width="100%">
                    <Typography variant="h2" gutterBottom>
                        Tentang Kami
                    </Typography>
                    <Typography variant="body1" paragraph style={{ textAlign: 'justify' }} fontWeight={400} fontSize={"16px"}>
                        <span className='font-bold'>Atma Kitchen</span> adalah tempat yang tepat bagi Anda yang mencari kue, hampers, makanan ringan, dan minuman berkualitas tinggi. Kami berdedikasi untuk menyediakan produk-produk lezat yang dibuat dengan bahan-bahan terbaik dan penuh cinta.
                    </Typography>
                    <Typography variant="body1" paragraph style={{ textAlign: 'justify' }} fontWeight={400} fontSize={"16px"}>
                        Kami menawarkan berbagai macam kue yang sempurna untuk segala kesempatan, mulai dari berbagai macam kue yang memiliki cita rasa unik. Selain itu, kami juga menyediakan berbagai makanan ringan yang cocok untuk menemani waktu santai Anda.
                    </Typography>
                    <Typography variant="body1" paragraph style={{ textAlign: 'justify' }} fontWeight={400} fontSize={"16px"}>
                        Jangan lupa untuk mencoba minuman kami yang menyegarkan. Mulai dari Choco Creamy Latte yang memiliki cita rasa kopi dipadukan dengan coklat bersamaan sampai dengan Matcha Creamy Latte kesukaan para anak muda.
                    </Typography>
                    <Typography variant="body1" paragraph style={{ textAlign: 'justify' }} fontWeight={400} fontSize={"16px"}>
                        Kami bangga menjadi bagian dari momen spesial Anda dan berkomitmen untuk memberikan yang terbaik dalam setiap gigitan.
                    </Typography>
                </Box>
                <Box bgcolor={'error.light'} p={2} mt={2} width="100%">
                    <Grid container spacing={2} >
                        <Grid item xs={12} sm={8}

                        >
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2058.7241410550255!2d110.41480341153995!3d-7.779243431499615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a59f1fb2f2b45%3A0x20986e2fe9c79cdd!2sUniversitas%20Atma%20Jaya%20Yogyakarta%20-%20Kampus%203%20Gedung%20Bonaventura%20Babarsari!5e1!3m2!1sid!2sid!4v1716804654497!5m2!1sid!2sid"
                                width="100%"
                                height="450"
                                style={{ border: 0, accentColor: 'transparent', boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </Grid >
                        <Grid item xs={12} sm={4} mt={2}

                        >
                            <Typography variant="h5" mb={'4px'} paragraph style={{ textAlign: 'justify' }} fontWeight={600}>
                                Atma Kitchen
                            </Typography>
                            <Typography variant="body1" mb={'2px'} paragraph style={{ textAlign: 'justify' }} fontWeight={400} fontSize={"16px"}>
                                Jl. Babarsari No.43, Janti, Caturtunggal, Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55281
                            </Typography>
                            <Typography variant="body1" mb={'4px'} paragraph style={{ textAlign: 'justify' }} fontWeight={400} fontSize={"16px"}>
                                <span className='font-semibold'>Phone</span>{': (027) 4487711'}
                            </Typography>
                            <Typography variant="body1" mb={'4px'} paragraph style={{ textAlign: 'justify' }} fontWeight={400} fontSize={"16px"}>
                                <span className='font-semibold'>E-mail</span>{': atmakitchen@example.com'}
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>

            </Grid>
        </Box>
    );
};

export default TentangKami;
