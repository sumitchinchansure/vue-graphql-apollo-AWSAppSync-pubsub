<template>
  <div class="conversation">
    <h1>This is an conversation page</h1>



      <ApolloQuery :query="queries.getConvo"
      :variables="{id: convoId}"
      >

    <ApolloSubscribeToMore
      :document="subscriptions.onCreateMessage"
      :variables="{ messageConversationId: conversationId }"

      :updateQuery="onMessageCreated"
    />

        <template slot-scope="{ result: { loading, error, data } }">
          <div v-if="loading" class="loading apollo">Loading...</div>

          <div v-else-if="error" class="error apollo">An error occured</div>

          <div v-else-if="data" class="result apollo">

            <b-table
              :data="data.getConvo.messages.items"
              :bordered="false"
              :striped="true"
              :narrowed="false"
              :hoverable="true"
              :loading="false"
              :focusable="false"
              :mobile-cards="true"
            >
              <template slot-scope="props">
                <b-table-column field="authorId" label="AuthorId">
                  {{ props.row.authorId }}
                </b-table-column>

                <b-table-column field="content" label="Content">
                  {{ props.row.content }}
                </b-table-column>

                <b-table-column field="createdAt" label="CreatedAt">
                  {{ props.row.createdAt }}
                </b-table-column>
              </template>
            </b-table>
          </div>

          <div v-else class="no-result apollo">No result :(</div>
        </template>
      </ApolloQuery>

  </div>
</template>

<script>
import { getConvo, onCreateMessage } from "../graphql"

export default {
  name: "Conversation",
  data() {
    return {
      // Initialize your apollo data
      // listUsers: [],
      queries: {
        getConvo: getConvo
      },
      subscriptions: {
        onCreateMessage: onCreateMessage
      },
      // convoId: "07b573ce-a14f-43d5-bcfe-2d38033eeace",
      // conversationId: "07b573ce-a14f-43d5-bcfe-2d38033eeace"
       convoId: "c97220d7-f98c-42fc-98c8-1eccf118e555",
       conversationId: "c97220d7-f98c-42fc-98c8-1eccf118e555"
    }
  },
  methods: {

    onMessageCreated (prev, { subscriptionData: { data : { onCreateMessage } } })  {
    
              let messageArray = prev.getConvo.messages.items.filter(message => message.id !== onCreateMessage.id)
              messageArray = [
                ...messageArray,
                onCreateMessage,
              ]

              return {
                ...prev,
                getConvo: {
                  ...prev.getConvo,
                  messages: {
                    ...prev.getConvo.messages,
                    items: messageArray
                  }
                }
              }
            }
  }
};
</script>
