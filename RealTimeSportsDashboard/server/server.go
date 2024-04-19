package server

import (
	"io/ioutil"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func Start() {
	r := mux.NewRouter()

	// Static file handler
	staticFileDirectory := http.Dir("web/static")
	staticFileHandler := http.FileServer(staticFileDirectory)
	r.PathPrefix("/static/").Handler(http.StripPrefix("/static/", staticFileHandler))

	// Route handlers
	r.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "web/static/index.html")
	})
	r.HandleFunc("/about", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "web/static/about.html")
	})
	r.HandleFunc("/contact", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "web/static/contact.html")
	})
	// New route for LastEventsHandler
	r.HandleFunc("/api/last-events/{teamId}", LastEventsHandler)

	log.Println("Server starting on :8080...")
	if err := http.ListenAndServe(":8080", r); err != nil {
		log.Fatal("Error starting server: ", err)
	}
}

func LastEventsHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	teamId := vars["teamId"] // Capture the team ID from the URL

	// Construct the URL with the team ID
	url := "https://www.thesportsdb.com/api/v1/json/3/eventslast.php?id=" + teamId
	resp, err := http.Get(url)
	if err != nil {
		log.Printf("Error fetching last events: %v", err)
		http.Error(w, "Failed to fetch data", http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Printf("Error reading response body: %v", err)
		http.Error(w, "Failed to read response body", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(body) // Directly pass the API response to the client
}
