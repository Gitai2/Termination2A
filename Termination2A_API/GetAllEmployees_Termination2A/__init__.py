import logging
import azure.functions as func
import pymssql
import os
import json

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info("Function triggered: GetAllEmployees_Termination2A")

    try:
        conn = pymssql.connect(
            server=os.environ["SQL_SERVER"],
            user=os.environ["SQL_USER"],
            password=os.environ["SQL_PASSWORD"],
            database=os.environ["SQL_DATABASE"]
        )
        cursor = conn.cursor(as_dict=True)
        cursor.execute("EXEC dbo.sp_GetAllEmployees_Termination2A")

        rows = cursor.fetchall()
        logging.info(f"ROWS FETCHED: {len(rows)}")

        conn.close()

        return func.HttpResponse(
            json.dumps(rows, default=str),
            mimetype="application/json",
            status_code=200
        )

    except Exception as e:
        logging.error(f"ERROR: {e}")
        return func.HttpResponse(
            f"Internal Server Error: {str(e)}",
            status_code=500
        )
