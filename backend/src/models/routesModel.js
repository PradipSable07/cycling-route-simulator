import client from "../utils/db.js";


const createRoute = async (data) => {
    console.log(data, '==data==');
    return await client.query(
        `INSERT INTO routes 
            (user_id, 
            name, 
            geometry, 
            distance)
        VALUES ($1, $2, ST_GeomFromGeoJSON($3), ST_Length(ST_Transform(ST_GeomFromGeoJSON($3), 3857)))
                 RETURNING id, user_id, name, ST_AsGeoJSON(geometry) as geometry, distance`,
        [data.userId, data.name, JSON.stringify(data.geometry)]
    );
}
const getAllRoutes =async (id) => {
    return await client.query(
        `SELECT 
            id, 
            user_id, 
            name, 
            ST_AsGeoJSON(geometry) as geometry, 
            distance, 
            created_at, 
            updated_at
        FROM routes`
    );
}

const getRouteById = async(id)=>{
    return await client.query(
        `SELECT 
            id, 
            user_id, 
            name, 
            ST_AsGeoJSON(geometry) as geometry, 
            distance, 
            created_at, 
            updated_at
        FROM routes 
        WHERE id = $1`,
        [id]
    );
}
const updateRoute = async (data,id)=>{
    return await client.query(
        `UPDATE routes 
            SET 
            name = $1, 
            geometry = ST_GeomFromGeoJSON($2), 
            distance = ST_Length(ST_GeomFromGeoJSON($2))
        WHERE id = $3
       RETURNING 
            id, 
            user_id, 
            name, 
            ST_AsGeoJSON(geometry) AS geometry, 
            distance, 
            created_at, 
            updated_at`,
        [data.name, JSON.stringify(data.geometry), id]
    );
}
const deleteRoute = async (id) => {
    return await client.query(
        `DELETE FROM routes WHERE id = $1 RETURNING *`,
        [id]
    );
}

export {createRoute,getAllRoutes,getRouteById,updateRoute,deleteRoute};


