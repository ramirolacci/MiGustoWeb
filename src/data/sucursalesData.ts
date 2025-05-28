// src/data/sucursalesData.ts

export interface Sucursal {
    nombre: string;
    direccion: string;
    localidad: string;
    provincia: string;
    telefono?: string;
    horario?: string;
    mapaEmbedUrl?: string;
}

export const sucursales: Sucursal[] = [
    {
        nombre: "Mi Gusto - Palermo",
        direccion: "Av. Cnel. Niceto Vega 5795",
        localidad: "Palermo",
        provincia: "CABA",
        telefono: "+54 11 4775-3500",
        horario: "Lun a Dom 10:00 - 22:00",
        mapaEmbedUrl: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13123.124!2d-58.441266!3d-34.585107!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb5ab1e5c8aef%3A0x95693dcd264542f2!2sMi%20Gusto%20Palermo!5e0!3m2!1ses!2sar!4v1686600000000!5m2!1ses!2sar"
    },
    {
        nombre: "Mi Gusto - Floresta",
        direccion: "Av. Rivadavia 9025",
        localidad: "Floresta",
        provincia: "CABA",
        telefono: "+54 11 2345-6789",
        horario: "Lun a Dom 11:00 - 23:00",
        mapaEmbedUrl: "https://www.google.com/maps/embed?pb=...Floresta"
    },
    {
        nombre: "Mi Gusto - Balvanera",
        direccion: "Av. Callao 474",
        localidad: "Balvanera",
        provincia: "CABA",
        telefono: "+54 11 3456-7890",
        horario: "Lun a Dom 10:00 - 22:00",
        mapaEmbedUrl: "https://www.google.com/maps/embed?pb=...Balvanera"
    },
    {
        nombre: "Mi Gusto - San Miguel",
        direccion: "Serrano 1665",
        localidad: "Muñiz",
        provincia: "Buenos Aires",
        telefono: "+54 11 6089-0291",
        horario: "Lun a Dom 11:00 - 23:00",
        mapaEmbedUrl: "https://www.google.com/maps/embed?pb=...SanMiguel"
    },
    {
        nombre: "Mi Gusto - Villa Devoto",
        direccion: "Av. Francisco Beiró 4523",
        localidad: "Villa Devoto",
        provincia: "CABA",
        telefono: "+54 11 4567-8901",
        horario: "Lun a Dom 11:00 - 23:30",
        mapaEmbedUrl: "https://www.google.com/maps/embed?pb=...VillaDevoto"
    },
    {
        nombre: "Mi Gusto - Martínez",
        direccion: "Hipólito Yrigoyen 1834",
        localidad: "Martínez",
        provincia: "Buenos Aires",
        telefono: "+54 11 5678-9012",
        horario: "Lun a Dom 11:00 - 23:00",
        mapaEmbedUrl: "https://www.google.com/maps/embed?pb=...Martinez"
    },
    {
        nombre: "Mi Gusto - Florida",
        direccion: "Av. Gral. José de San Martín 1904",
        localidad: "Florida",
        provincia: "Buenos Aires",
        telefono: "+54 11 6789-0123",
        horario: "Lun a Dom 11:00 - 23:00",
        mapaEmbedUrl: "https://www.google.com/maps/embed?pb=...Florida"
    },
    {
        nombre: "Mi Gusto - Belgrano",
        direccion: "Av. Dr. Ricardo Balbín 2395",
        localidad: "Belgrano",
        provincia: "CABA",
        telefono: "+54 11 7890-1234",
        horario: "Lun a Dom 11:00 - 23:00",
        mapaEmbedUrl: "https://www.google.com/maps/embed?pb=...Belgrano"
    },
    {
        nombre: "Mi Gusto - San Fernando",
        direccion: "Av. Pres. Perón 2240",
        localidad: "San Fernando",
        provincia: "Buenos Aires",
        telefono: "+54 11 8901-2345",
        horario: "Lun a Dom 11:00 - 23:00",
        mapaEmbedUrl: "https://www.google.com/maps/embed?pb=...SanFernando"
    },
    {
        nombre: "Mi Gusto - Munro",
        direccion: "Av. Bartolomé Mitre 2510",
        localidad: "Munro",
        provincia: "Buenos Aires",
        telefono: "+54 11 9012-3456",
        horario: "Lun a Dom 11:00 - 23:00",
        mapaEmbedUrl: "https://www.google.com/maps/embed?pb=...Munro"
    },
    {
        nombre: "Mi Gusto - Tigre",
        direccion: "Av. Cazón 699",
        localidad: "Tigre",
        provincia: "Buenos Aires",
        telefono: "+54 11 7127-9343",
        horario: "Lun a Dom 11:00 - 23:00",
        mapaEmbedUrl: "https://www.google.com/maps/embed?pb=...Tigre"
    },
    {
        nombre: "Mi Gusto - Pilar",
        direccion: "Ruta 8 Km 52,5",
        localidad: "Pilar",
        provincia: "Buenos Aires",
        telefono: "+54 11 4567-8910",
        horario: "Lun a Dom 11:00 - 23:00",
        mapaEmbedUrl: "https://www.google.com/maps/embed?pb=...Pilar"
    },
    {
        nombre: "Mi Gusto - Quilmes",
        direccion: "Av. Hipólito Yrigoyen 1000",
        localidad: "Quilmes",
        provincia: "Buenos Aires",
        telefono: "+54 11 4123-4567",
        horario: "Lun a Dom 10:30 - 22:30",
        mapaEmbedUrl: "https://www.google.com/maps/embed?pb=...Quilmes"
    },
    {
        nombre: "Mi Gusto - Lanús",
        direccion: "Av. 9 de Julio 1800",
        localidad: "Lanús",
        provincia: "Buenos Aires",
        telefono: "+54 11 4789-0123",
        horario: "Lun a Dom 11:00 - 23:00",
        mapaEmbedUrl: "https://www.google.com/maps/embed?pb=...Lanus"
    },
    {
        nombre: "Mi Gusto - Morón",
        direccion: "Av. Rivadavia 18000",
        localidad: "Morón",
        provincia: "Buenos Aires",
        telefono: "+54 11 4890-2345",
        horario: "Lun a Dom 11:00 - 23:00",
        mapaEmbedUrl: "https://www.google.com/maps/embed?pb=...Moron"
    },
    {
        nombre: "Mi Gusto - Ramos Mejía",
        direccion: "Av. de Mayo 950",
        localidad: "Ramos Mejía",
        provincia: "Buenos Aires",
        telefono: "+54 11 5670-0987",
        horario: "Lun a Dom 11:00 - 23:00",
        mapaEmbedUrl: "https://www.google.com/maps/embed?pb=...Ramos"
    },
    {
        nombre: "Mi Gusto - Lomas de Zamora",
        direccion: "Av. Hipólito Yrigoyen 8900",
        localidad: "Lomas de Zamora",
        provincia: "Buenos Aires",
        telefono: "+54 11 4568-9123",
        horario: "Lun a Dom 11:00 - 23:00",
        mapaEmbedUrl: "https://www.google.com/maps/embed?pb=...Lomas"
    },
    {
        nombre: "Mi Gusto - San Justo",
        direccion: "Av. Brig. Gral. Juan Manuel de Rosas 5000",
        localidad: "San Justo",
        provincia: "Buenos Aires",
        telefono: "+54 11 4900-1122",
        horario: "Lun a Dom 11:00 - 23:00",
        mapaEmbedUrl: "https://www.google.com/maps/embed?pb=...SanJusto"
    },
    {
        nombre: "Mi Gusto - Moreno",
        direccion: "Av. Victorica 150",
        localidad: "Moreno",
        provincia: "Buenos Aires",
        telefono: "+54 11 6011-1122",
        horario: "Lun a Dom 11:00 - 22:30",
        mapaEmbedUrl: "https://www.google.com/maps/embed?pb=...Moreno"
    },
    {
        nombre: "Mi Gusto - La Plata",
        direccion: "Calle 12 N°1234",
        localidad: "La Plata",
        provincia: "Buenos Aires",
        telefono: "+54 221 456-7890",
        horario: "Lun a Dom 11:00 - 23:00",
        mapaEmbedUrl: "https://www.google.com/maps/embed?pb=...LaPlata"
    },
    {
        nombre: "Mi Gusto - Avellaneda",
        direccion: "Av. Mitre 1234",
        localidad: "Avellaneda",
        provincia: "Buenos Aires",
        telefono: "+54 11 4444-5555",
        horario: "Lun a Dom 11:00 - 22:00",
        mapaEmbedUrl: "https://www.google.com/maps/embed?pb=...Avellaneda"
    },
    {
        nombre: "Mi Gusto - Escobar",
        direccion: "Panamericana km 50",
        localidad: "Escobar",
        provincia: "Buenos Aires",
        telefono: "+54 11 3322-4455",
        horario: "Lun a Dom 11:00 - 23:00",
        mapaEmbedUrl: "https://www.google.com/maps/embed?pb=...Escobar"
    },
    {
        nombre: "Mi Gusto - José C. Paz",
        direccion: "Ruta 197 y Pueyrredón",
        localidad: "José C. Paz",
        provincia: "Buenos Aires",
        telefono: "+54 11 5555-6666",
        horario: "Lun a Dom 11:00 - 22:00",
        mapaEmbedUrl: "https://www.google.com/maps/embed?pb=...JoseCPaz"
    },
    {
        nombre: "Mi Gusto - Cañuelas",
        direccion: "Av. Libertad 654",
        localidad: "Cañuelas",
        provincia: "Buenos Aires",
        telefono: "+54 2226 123-456",
        horario: "Lun a Dom 11:00 - 22:00",
        mapaEmbedUrl: "https://www.google.com/maps/embed?pb=...Canuelas"
    },
    {
        nombre: "Mi Gusto - Mar del Plata",
        direccion: "Av. Colón 1001",
        localidad: "Mar del Plata",
        provincia: "Buenos Aires",
        telefono: "+54 223 456-7890",
        horario: "Lun a Dom 12:00 - 00:00",
        mapaEmbedUrl: "https://www.google.com/maps/embed?pb=...MarDelPlata"
    },
    {
        nombre: "Mi Gusto - Bahía Blanca",
        direccion: "Av. Alem 765",
        localidad: "Bahía Blanca",
        provincia: "Buenos Aires",
        telefono: "+54 291 456-7890",
        horario: "Lun a Dom 11:00 - 23:00",
        mapaEmbedUrl: "https://www.google.com/maps/embed?pb=...BahiaBlanca"
    }
];
